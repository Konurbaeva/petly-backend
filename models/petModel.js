const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    birthday: {
        type: String,
    },
    breed: {
      type: String,
    },
    photo: {
      type: String,
    },
    comments: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);


const Pet = mongoose.model("Pet", petSchema);

module.exports = {
  Pet
};
