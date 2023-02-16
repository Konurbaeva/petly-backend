const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");
const Jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");

const RequestError = require("../helpers/RequestError");
const { User } = require("../models/userModel");
const { sendEmail } = require("../services/sendEmail");
const { recoveryTemplate } = require("../email/emailTemplates");

const registerController = async (req, res) => {
  const { email: reqEmail } = req.body;

  if (await User.findOne({ email: reqEmail })) {
    throw RequestError(409, "This email is already in use");
  }

  const user = new User(req.body);
  await user.save();
  const { email, name, address, phone } = user;
  return res.status(201).json({ email, name, address, phone });
};

const loginController = async (req, res) => {
  const { email: reqEmail, password } = req.body;
  const user = await User.findOne({ email: reqEmail });

  if (!user) {
    throw RequestError(401, "User with this email not found");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw RequestError(401, "Wrong password");
  }

  const userToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { token: userToken },
    { new: true }
  ).populate("pets", "_id name birthday breed photo comments");

  const {
    _id,
    email,
    name,
    address,
    phone,
    birthday,
    avatarURL,
    token,
    pets,
    favorites,
  } = updatedUser;
  return res.status(200).json({
    _id,
    email,
    name,
    address,
    phone,
    birthday,
    avatarURL,
    token,
    pets,
    favorites,
  });
};

const getCurrentController = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id, {
    password: 0,
    token: 0,
    createdAt: 0,
    updatedAt: 0,
  }).populate("pets", "_id name birthday breed photo comments");
  return res.status(200).json(user);
};
const logoutController = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  return res.status(204).json();
};

const updateController = async (req, res) => {
  const {
    name: rName,
    email: rEmail,
    address: rAddress,
    phone: rPhone,
    birthday: rBirthday,
  } = req.body;
  const { _id } = req.user;

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      name: rName,
      email: rEmail,
      address: rAddress,
      phone: rPhone,
      birthday: rBirthday,
    },
    { new: true }
  );

  const { email, name, address, phone, birthday } = updatedUser;
  res.status(200).json({ email, name, address, phone, birthday });
};

const avatarController = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const filename = `${_id}_${originalname}`;

  const croppedAvatar = await Jimp.read(tempUpload);
  croppedAvatar.cover(350, 350).write(tempUpload);

  const result = await cloudinary.uploader.upload(
    tempUpload,
    { public_id: filename }
    // function (error, result) {}
  );
  const { secure_url: avatarURL } = result;
  await fs.unlink(tempUpload);

  await User.findByIdAndUpdate(_id, { avatarURL });
  return res.status(200).json({ avatarURL });
};

const getStatusController = async (req, res) => {
  return res.status(200).json({ message: "Information found" });
};

const recoveryController = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "User with this email not found");
  }
  // check if user is already login ??? another check ??
  const recoveryToken = uuidv4();
  await User.findByIdAndUpdate(user._id, { recoveryToken });

  const mail = {
    to: email,
    subject: "Reset your password",
    html: recoveryTemplate(recoveryToken),
  };
  await sendEmail(mail);

  return res.status(200).json({
    message: "Reset password link was sent succesfull",
  });
};

const resetPasswordController = async (req, res) => {
  const { recoveryToken } = req.params;

  const user = await User.findOne({ recoveryToken });
  if (!user) {
    throw RequestError(401, "User not found");
  }
  const { password } = req.body;
  const cryptedPassword = await bcrypt.hash(password, 10);
  await User.findByIdAndUpdate(user._id, {
    recoveryToken: "",
    password: cryptedPassword,
  });
  // for development
  // await User.findByIdAndUpdate(user._id, { recoveryToken, password: cryptedPassword });

  return res.status(200).json({
    message: "Password was changed successfull",
  });
};
const googleController = async (req, res) => {
  const { _id } = req.user;

  const userToken = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  await User.findByIdAndUpdate(
    _id,
    { token: userToken },
    { new: true }
  ).populate("pets", "_id name birthday breed photo comments");
};

module.exports = {
  registerController,
  loginController,
  getCurrentController,
  logoutController,
  updateController,
  avatarController,
  getStatusController,
  recoveryController,
  resetPasswordController,
  googleController,
};
