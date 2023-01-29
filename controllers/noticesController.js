const { RequestError } = require("../helpers");
const { Notices } = require("../models/noticesModel");
const { User } = require("../models/userModel");

const getNoticeById = async (req, res) => {
  const { id } = req.params;
  const result = await Notices.findOne({ _id: id });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  return res.status(200).json(result);
};

const getNoticesByCategory = async (req, res) => {
  const { categoryName } = req.params;
  const result = await Notices.find({ categoryName });

  if (!result) {
    throw RequestError(404, "Not found");
  }
  return res.status(200).json(result);
};

const addToFavorites = async (req, res) => {
  const userId = req.body.userId;
  const favId = req.params.id;
  const result = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { favorites: favId } },
    { new: true }
  );

  if (!result) {
    throw RequestError(404, "Not found");
  }
  return res.status(201).json(result);
};

const getNotifications = async (req, res) => {
  const { _id } = req.user;
  const result = await Notices.findOne({ _id }).populate("notifications");
  if (!result) {
    throw RequestError(404, "Not found");
  }
  return res.status(200).json(result);
};

// const removeFromFavorites = async (req, res) => {
//   //   TODO implement the logic to remove the notice from the user's favorites - how this collection will be called?
//   //   will be notice or ad in Favorites collection/document?
//   const userId = req.user._id;
//   const favId = req.params.id;
//   const removedFavorite = await Favorite.findOneAndRemove({
//     user: userId,
//     notice: favId,
//   });
//   return removedFavorite;
// };

module.exports = {
  getNoticesByCategory,
  getNoticeById,
  addToFavorites,
  getNotifications,
  //   removeFromFavorites,
};
