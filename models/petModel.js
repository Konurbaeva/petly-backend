const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    birthday: {
      type: String,
      default: null
    },
    breed: {
      type: String,
      default: null
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


const Pet = mongoose.model("Pet", petSchema);

module.exports = {
  Pet
};
