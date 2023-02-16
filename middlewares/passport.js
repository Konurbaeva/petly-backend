const { Strategy } = require("passport-google-oauth2");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../models/userModel");
const passport = require("passport");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL:
    "https://goit-project-petly-backend.onrender.com/api/users/google/callback",
  passReqCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email, displayName } = profile;
    const user = await User.findOne({ email });
    if (user) {
      done(null, user);
    }
    const password = uuidv4();
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      name: displayName,
      password: hashPassword,
    });
    await newUser.save();
    done(null, newUser);
  } catch (error) {
    console.log(error);
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy);

module.exports = passport;
