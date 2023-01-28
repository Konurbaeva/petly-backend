const { RequestError } = require("../helpers")

const getNoticeById = async(id) => {
    const result = await Notices.findOne({ _id: id })
    if(!result) {
        throw RequestError(404, "Not found")
    }
    res.json(result)
}

module.exports = {
    getNoticeById
}