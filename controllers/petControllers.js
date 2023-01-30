require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs/promises');
const Jimp = require('jimp');
// const RequestError = require('../helpers/RequestError');
const { Pet } = require('../models/petModel');

const createPetController = async (req, res) => {
    // console.log(req.file);
    // console.log(req.body);
    const { path: tempUpload, originalname } = req.file;
    const { _id: userID } = req.user
    const { name, birthday, breed, comments } = req.body;
    

    const filename = `${userID}_${originalname}`
    
    const croppedPetImg = await Jimp.read(tempUpload);
    croppedPetImg.cover(350, 350).write(tempUpload);

    const result = await cloudinary.uploader.upload(tempUpload, { public_id: filename },
        function (error, result) {
            // console.log(result);
        });
    const { secure_url: petImgURL } = result;
    await fs.unlink(tempUpload);
    const pet = new Pet({name, birthday, breed, comments, photo: petImgURL, owner: userID});
    await pet.save();
    return res.status(201).json(pet);
}

const getPetController = async(req, res) => {
    const pets = await Pet.find().populate("owner", "_id email");
    return res.status(201).json(pets);
}
module.exports = {
    createPetController, getPetController

}