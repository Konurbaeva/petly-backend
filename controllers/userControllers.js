const { User } = require('../models/userModel');

const registerController = async (req, res) => {
    const { email, password } = req.body;

    // if(await User.findOne({email})) {
    //     throw new RegistrationConflictError('This email is already in use');
    // }
    const user = new User({ password, email });
    await user.save();
    return res.status(201).json({email});
}

module.exports = {
    registerController
}