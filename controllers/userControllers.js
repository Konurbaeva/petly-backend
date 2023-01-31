const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs/promises');
const Jimp = require('jimp');

// Don't remove this config
// cloudinary.config({ 
//   cloud_name: 'dr525ee18', 
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true
// });

const RequestError = require('../helpers/RequestError');
const { User } = require('../models/userModel');

const registerController = async (req, res) => {
    const { email } = req.body;
    if(await User.findOne({email})) {
        throw RequestError(409, "This email is already in use")
    }
    const user = new User(req.body);
    await user.save();
    return res.status(201).json(user);
}

const loginController = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
        throw RequestError(401, 'User with this email not found')
    }

    if (!await bcrypt.compare(password, user.password)) {
        throw RequestError(401, 'Wrong password')
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    await User.findByIdAndUpdate(user._id, {token});
    return res.status(200).json({ email, token });
}

const getCurrentController = async (req, res) => {
    const {_id} = req.user;
    const user = await User.findById(_id).populate("pets", "_id name birthday breed photo comments");
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

    const result = await cloudinary.uploader.upload(tempUpload, { public_id: filename },
        function (error, result) {
            // console.log(result);
            return error
        });
    const { secure_url: avatarURL } = result;
    await fs.unlink(tempUpload);

    await User.findByIdAndUpdate(_id, { avatarURL });
    return res.status(200).json({  avatarURL });
    
}
module.exports = {
    registerController, loginController, getCurrentController, logoutController, updateController, avatarController
}