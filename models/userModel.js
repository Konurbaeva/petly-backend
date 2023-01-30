const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");
const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      match: phoneRegExp,
      default: null,
    },
    birthday: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.pre("save", async function EncryptPasswordBeforeSaving() {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string(),
  address: Joi.string(),
  phone: Joi.string().pattern(phoneRegExp),
});
const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  schemas,
};
