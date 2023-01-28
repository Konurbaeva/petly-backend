const { RequestError } = require("../helpers")

const getNoticesByCategory = async(categoryName) => {
    const {categoryName} = req.params
    const result = await Notices.find({ categoryName })

    if(!result) {
        throw RequestError(404, "Not found")
    }
    res.json(result)
  }

  module.exports = getNoticesByCategory