const cloudinary = require('cloudinary').v2;
const fs = require('fs/promises');
const Jimp = require('jimp');
require('dotenv').config();

const { Pet } = require('../models/petModel');
const { User } = require('../models/userModel');
const RequestError = require('../helpers/RequestError');

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

    await User.findByIdAndUpdate(userID, {$push: {pets: pet} })
    return res.status(201).json(pet);
}


const removePetController = async (req, res) => {
    // console.log(req.user);
    const { _id: userId } = req.user
    const { petId } = req.params

    const deletedPet = await Pet.findOneAndDelete({_id: petId, owner: userId});
    if (!deletedPet) {
        throw RequestError(404, "Pet not found");
    }
    await User.findByIdAndUpdate(userId, { $pull: { pets: petId } });
    return res.status(200).json({ message: "Pet deleted" });
}

module.exports = {
    createPetController, removePetController
}