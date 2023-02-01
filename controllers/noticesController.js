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

const updateNotice= async (req, res) => {
  const { _id } = req.user;
  const notice = await Notices.find({ _id });
  
  const updatedNotice = await User.findByIdAndUpdate(_id, {
  $push: { notices: notice }
  });

  return res.status(200).json(updatedNotice);
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
  getNotifications,
  removeFromFavorites,
  updateNotice
};
