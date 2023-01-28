const getNoticesByCategory = require("./getNoticesByCategory")
const getNoticeById = require("./getNoticeById")
const addToFavorites = require("./addToFavorites")
const getNotifications = require("./getNotifications")
const removeFromFavorites = require("./removeFromFavorites")

module.exports = {
    getNoticesByCategory,
    getNoticeById,
    addToFavorites,
    getNotifications,
    removeFromFavorites
}