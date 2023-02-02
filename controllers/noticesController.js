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

// const getMyNotice = async (req, res) => {
//   const { _id } = req.user;

//   const myNotices = await Notices.find({ owner: _id });

//   if (!myNotices) {
//     throw RequestError(404, "Not found");
//   }
//   return res.status(200).json(result);
// };

const getMyNotice = async (req, res) => {
  const { _id } = req.user;

  const myNotices = await Notices.find({ owner: _id });

  if (!myNotices) {
    throw RequestError(404, "Not found");
  }
  return res.status(200).json(result);
};


const deleteMyNotice = async (req, res) => {

};


const getSearchQuery = async (req, res) => {
  const { searchQuery } = req.query;

  const result = await Notices.find({title: searchQuery });

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

// const removeFromFavorites = async (req, res) => {
//   // is it req.user._id or  const userId = req.body.userId?
//   //  const userId = req.body.userId;
//   const userId = req.user._id;
//   const favId = req.params.id;

//   const result = await User.findOneAndUpdate(
//     { _id: userId },
//     { $pull: { favorites: favId } },
//     { new: true }
//     );

//     if(!result) {
//       throw RequestError(404, "Not found");
//       }
//     return res.status(200).json(result);
// };
const removeFromFavorites = async (req, res) => {
  // is it req.user._id or  const userId = req.body.userId?
  //  const userId = req.body.userId;
  const userId = req.user._id;
  const favId = req.params.id;

  const result = await User.findOneAndRemove(
    { _id: userId },
    { $pull: { favorites: favId } },
    { new: true }
  );

  if (!result) {
    throw RequestError(404, "Not found");
  }
  return res.status(200).json(result);
};



  const addNotice = async (req, res) => {
    const { _id } = req.user;

    const result = await Notices.create({
      ...req.body,
      owner: _id,
    });
    return res.status(201).json(result);
  };

module.exports = {
  addNotice,
  getNoticesByCategory,
  getNoticeById,
  addToFavorites,
  removeFromFavorites,
  getMyNotice,
  deleteMyNotice,
  getSearchQuery
};
