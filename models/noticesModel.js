const { Schema, model } = require("mongoose");
const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");


const noticesShema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  name: {
    type: String,
    default: null,
  },
  birthdate: {
    type: String,
    default: null,
  },
  breed: {
    type: String,
    default: null,
  },
  location: {
    type: String,
    default: null,
  },
  comments: {
    type: String,
    default: null,
  },
   categoryName: {
    type: String,
    enum: ["sell", "lost-found", "for-free"],
    default: "sell",
  },
  price: {
    type: Number,
    min: 1,
    required: function (req, res) {
      return this.categoryName === "sell";
    },
  },
  photo: {
    type: String,
    default: null
  },
  sex: {
    type: String,
    enum: ["male", "female"],
    default: "male",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
},
 { versionKey: false, timestamps: true }
);

noticesShema.post("save", handleMongooseError);


const noticeValidateSchema = Joi.object({
  title: Joi.string().min(2).max(50).required(),
  name: Joi.string().min(2).max(20).allow(null, ''),
  birthdate: Joi.string().allow(null, ''),
  breed: Joi.string().min(2).max(25).allow(null, ''),
  location: Joi.string().allow(null, ''),
  comments: Joi.string().min(8).max(120).allow(null, ''),
  categoryName: Joi.string().valid("sell", "lost-found", "for-free"),
  sex: Joi.string().valid("male", "female"),
  price: Joi.allow(null, ''),
  photo: Joi.allow(null, ''),
});

const schemas = {
  noticeValidateSchema,
};

const Notices = model("notices", noticesShema);

module.exports = {
  Notices,
  schemas
};
