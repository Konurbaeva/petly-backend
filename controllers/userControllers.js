const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const RequestError = require('../helpers/RequestError')
const { User } = require('../models/userModel');

const registerController = async (req, res) => {
    const { email } = req.body;
    if(await User.findOne({email})) {
        throw RequestError(409, "This email is already in use")
    }
    const user = new User(req.body);
    await user.save();
    return res.status(201).json(req.body);
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
    const { email } = req.user
    return res.status(200).json({email})
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

module.exports = {
    registerController, loginController, getCurrentController, logoutController, updateController
}