const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs/promises');
const Jimp = require('jimp');

const RequestError = require('../helpers/RequestError');
const { User } = require('../models/userModel');

const registerController = async (req, res) => {
    const { email: reqEmail } = req.body;
    
    if(await User.findOne({email:reqEmail})) {
        throw RequestError(409, "This email is already in use")
    }

    const user = new User(req.body);
    await user.save();
    const { email, name, address, phone } = user;
    return res.status(201).json({ email, name, address, phone });
}

const loginController = async (req, res) => {
    const { email: reqEmail, password } = req.body;
    const user = await User.findOne({ email: reqEmail });
    
    if (!user) {
        throw RequestError(401, 'User with this email not found')
    }

    if (!await bcrypt.compare(password, user.password)) {
        throw RequestError(401, 'Wrong password')
    }

    const userToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    const updatedUser = await User.findByIdAndUpdate(user._id, { token: userToken }, {new: true}).populate("pets", "_id name birthday breed photo comments");

    const { email, name, address, phone, birthday, avatarURL, token, pets, favorites } = updatedUser
    return res.status(200).json({ email, name, address, phone, birthday, avatarURL, token, pets, favorites });
}

const getCurrentController = async (req, res) => {
    const {_id} = req.user;
    const user = await User.findById(_id, { password: 0, token: 0, createdAt: 0, updatedAt: 0}).populate("pets", "_id name birthday breed photo comments");
    return res.status(200).json(user);
}
const logoutController = async (req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: null});
    return res.status(204).json();
}

const updateController = async (req, res) => { 
    const { name: rName, email: rEmail, address: rAddress, phone: rPhone, birthday: rBirthday } = req.body;
    const { _id } = req.user;

    const updatedUser = await User.findByIdAndUpdate(_id, {name: rName, email: rEmail, address: rAddress, phone: rPhone, birthday: rBirthday}, {new: true});
    
    const { email, name, address, phone, birthday } = updatedUser
    res.status(200).json({ email, name, address, phone, birthday });
}

const avatarController = async (req, res) => { 
    // console.log(req.body);
    // console.log(req.file);
    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user
    const filename = `${_id}_${originalname}`
    
    const croppedAvatar = await Jimp.read(tempUpload);
    croppedAvatar.cover(350, 350).write(tempUpload);

    const result = await cloudinary.uploader.upload(tempUpload, { public_id: filename }, function (error, result) {  });
    const { secure_url: avatarURL } = result;
    await fs.unlink(tempUpload);

    await User.findByIdAndUpdate(_id, { avatarURL });
    return res.status(200).json({  avatarURL });
    
}

const getStatusController = async (req, res) => { 
    return res.status(200).json({  message: "Information found" });
}
module.exports = {
    registerController, loginController, getCurrentController, logoutController, updateController, avatarController, getStatusController
}