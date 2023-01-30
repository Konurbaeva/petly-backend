const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');
// todo - custom error doesn't work correctly !!!!!

const authMiddleware = async (req, res, next) => {

const {authorization = ""} = req.headers;
const [tokenType, token] = authorization.split(" ");

try {
    if (tokenType !== "Bearer") {
        return res.status(401).json({"message": 'Token type error'});
    }

    if (!token) {
        return res.status(401).json({"message": 'Token is required'});
    }

    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(_id);

    if(!user || !user.token) {
        return res.status(401).json({"message": 'User or token not found'});
    }

    if(user.token !== token) {
        return res.status(401).json({"message": "Token doesn't match the token in DB"});
    }
    
    req.user = user;
    next();
} catch (error) {
    return res.status(401).json({"message": 'Token is invalid', "details" : error});
}
   
    
    
}

module.exports = {
    authMiddleware
}