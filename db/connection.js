const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const connectMongo = async () => {
  //   console.log(process.env.DB_HOST);
  return mongoose.connect(process.env.DB_HOST);
};

module.exports = connectMongo;
