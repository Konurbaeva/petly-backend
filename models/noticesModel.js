const { Schema, model } = require("mongoose");

const noticesShema = new Schema({
  title: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 20,
  },
  birthdate: {
    type: Date,
  },
  breed: {
    type: String,
    minlength: 2,
    maxlength: 25,
  },
  location: {
    type: String,
  },
  comments: {
    type: String,
    minlength: 8,
    maxlength: 120,
    required: true,
  },
  price: {
    type: Number,
    min: 1,
    required: function (req, res) {
      return this.categoryName === "sell";
    },
  },
  categoryName: {
    type: String,
    enum: ["sell", "lost-found", "for-free"],
    default: "sell",
  },
 owner: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

const Notices = model("notices", noticesShema);
module.exports = {
  Notices,
};
