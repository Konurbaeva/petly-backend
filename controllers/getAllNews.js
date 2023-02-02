const { RequestError } = require("../helpers");
const { News } = require("../models/newsModel");

const getAllNews = async (req, res, next) => {
  const result = await News.find({});

  if (!result) {
    throw RequestError(404, "Not found");
  }

  res.json(result);
};

module.exports = getAllNews;
