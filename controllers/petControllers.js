require('dotenv').config();
// const cloudinary = require('cloudinary').v2;
// const fs = require('fs/promises');
// const Jimp = require('jimp');

// const RequestError = require('../helpers/RequestError');
const { Pet } = require('../models/petModel');

const createPetController = async (req, res) => {
    console.log(req.file);
    console.log(req.body);
    
    // const { email } = req.body;
    


    const pet = new Pet(req.body);
    await pet.save();
    return res.status(201).json(req.body);
}
module.exports = {
    createPetController
}