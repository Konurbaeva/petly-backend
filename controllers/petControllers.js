const cloudinary = require('cloudinary').v2;
const fs = require('fs/promises');
require('dotenv').config();

const { Pet } = require('../models/petModel');
const { User } = require('../models/userModel');
const RequestError = require('../helpers/RequestError');

const createPetController = async (req, res) => {
    const { _id: userID } = req.user
    let petImgURL = null;

    if (req.file) {
        const { path: tempUpload, originalname } = req.file;
        //    temporary solution
        const imgName = originalname.split('.')[0]

        const filename = `${userID}_${imgName}`
        const result = await cloudinary.uploader.upload(tempUpload, { public_id: filename }, function (error, result) {
         });
        const { secure_url, public_id } = result;
        // console.log(result);
        await fs.unlink(tempUpload);
        // petImgURL = secure_url;
        petImgURL = cloudinary.url(public_id, {quality: "auto:eco"});
        // console.log(petImgURL);
    }
    const pet = new Pet({ ...req.body, photo: petImgURL, owner: userID});
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