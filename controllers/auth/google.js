const jwt = require('jsonwebtoken');
require('dotenv').config();
// const { User } = require('../models/userModel');
const { User } = require("../../models/userModel");

const { SECRETKEY } = process.env;

const google = async(req, res) => {
  const { _id: id} = req.user;

  const payload = {
    id
  }

  const token =  jwt.sign(payload, SECRETKEY, { expiresIn: "23h"});
  await User.findByIdAndUpdate(id, { token});

 // redirect to frontend
  res.redirect(`https://kl0filinj.github.io/goit-project-petly?token=${token}`)
}

module.exports = google;