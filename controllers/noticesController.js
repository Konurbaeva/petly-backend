const cloudinary = require('cloudinary').v2;
const fs = require('fs/promises');

const { RequestError } = require("../helpers");
const { Notices } = require("../models/noticesModel");
const { User } = require("../models/userModel");

const addNotice = async (req, res) => {
  const { _id: userID } = req.user

  let noticeImgURL = null;
  
  if (req.file) {
    const { path: tempUpload, originalname } = req.file;
    const filename = `${userID}_${originalname}`
    const result = await cloudinary.uploader.upload(tempUpload, { public_id: filename }, function (error, result) {});
    const { secure_url } = result;
    await fs.unlink(tempUpload);
    noticeImgURL = secure_url;
  }
    
  const notice = new Notices({... req.body, photo: noticeImgURL, owner: userID});
  await notice.save();

  // const database = client.db("db-testDB");
  // console.log(database);
  // await Notices.createIndex({ title: "text" });
  return res.status(201).json(notice);
};

const getMyNotices = async (req, res) => {
  const { _id } = req.user;

  const myNotices = await Notices.find({ owner: _id });

  if (!myNotices) {
    throw RequestError(404, "Not found");
  }
  return res.status(200).json(myNotices);
};

const getNoticeById = async (req, res) => {
  const { id } = req.params;
  const result = await Notices.findOne({ _id: id });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  return res.status(200).json(result);
};

const deleteMyNotice = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;

  const deletedNotice = await Notices.findOneAndDelete({_id: id, owner: userId});

  if (!deletedNotice) {
    throw RequestError(404, "Notice not found");
  }
  // await Notices.createIndex({ title: "text" });
  return res.status(200).json({ message: "Notice deleted" });
};

const getNoticesByCategory = async (req, res) => {
  const { categoryName } = req.params;
  const { query } = req.query;
  const options =
    query === undefined
      ? { categoryName }
      : { categoryName, $text: { $search: query } };
  const result = await Notices.find(options);

  if (!result) {
    throw RequestError(404, "Not found");
  }
  return res.status(200).json(result);
};

const addToFavorites = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: noticeId } = req.params;
  // can use only id to pull or push

  const notice = await Notices.findById(noticeId);
  if (!notice) {
    throw RequestError(404, "Notice not found");
  }
  // check if notice is already in WISHLIST
  const { favorites } = await User.findById(userId);
  if (favorites.includes(noticeId)) {
    throw RequestError(400, "Notice is already in Wishlist");
  }
  // 
  await User.findByIdAndUpdate(userId, { $push: { favorites: noticeId } }, {new: true})
  return res.status(200).json({"message": "Notice added to wishlist", "notice": notice});
};

const removeFromFavorites = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: noticeId } = req.params;
  // can use only id to pull or push
  const notice = await Notices.findById(noticeId);
  if (!notice) {
    throw RequestError(404, "Notice not found");
  }

  await User.findByIdAndUpdate(userId, { $pull: { favorites: noticeId } }, { new: true });
  
  return res.status(200).json({"message": "Notice removed from wishlist", "notice": notice});

};


const getFavoriteNotices = async (req, res) => {
  const { _id: userId } = req.user;
  
  const UserWithFavNotices = await User.findById(userId).populate("favorites", "title name birthdate breed location comments categoryName price photo sex owner");
  const { favorites } = UserWithFavNotices

  return res.status(200).json({ favorites });
};












module.exports = {
  addNotice,
  getNoticesByCategory,
  getNoticeById,
  addToFavorites,
  removeFromFavorites,
  getMyNotices,
  deleteMyNotice,
  getFavoriteNotices,
};
