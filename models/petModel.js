const mongoose = require("mongoose");
const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    birthday: {
      type: String,
      required: [true, "Birthday is required"],
    },
    breed: {
      type: String,
      required: [true, "Breed is required"],
    },
    photo: {
      type: String,
      default: null
    },
    comments: {
      type: String,
      default: null
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }
  },
  { versionKey: false, timestamps: true }
);

petSchema.post("save", handleMongooseError);


const petValidateSchema = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  birthday: Joi.string().required(),
  breed: Joi.string().min(3).max(25).required(),
  comments: Joi.string().allow(null, ''),
  photo: Joi.allow(null, ''),
});

const schemas = {
  petValidateSchema,
};

const Pet = mongoose.model("Pet", petSchema);



module.exports = {
  Pet,
  schemas
};
