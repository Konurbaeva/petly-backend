const News = require("../models/newsModel");


const getAllNews = async (req, res, next) => {
    const result = await News.find()
  

    res.json(result)
}

module.exports = getAllNews;