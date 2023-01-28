const { RequestError } = require("../helpers")


const getNoticeById = async(id) => {
    const result = await Notices.findOne({ _id: id })
    if(!result) {
        throw RequestError(404, "Not found")
    }
    res.json(result)
}

const getNoticesByCategory = async(categoryName) => {
    const {categoryName} = req.params
    const result = await Notices.find({ categoryName })

    if(!result) {
        throw RequestError(404, "Not found")
    }
    res.json(result)
  }

  const addToFavorites = async(userId, favId) => {
    const result = await User.findOneAndUpdate({ _id: userId }, { $push: { favorites: favId } }, { new: true });
   
    if(!result) {
        throw RequestError(404, "Not found")
    }
    res.json(result)
}

const getNotifications = async(userId) => {
    const result = await Notices.findOne({ _id: userId }).populate('notifications');
    if(!result) {
        throw RequestError(404, "Not found")
    }
    res.json(result)
}

const removeFromFavorites = async(userId, favId) => {
    try {
        //TODO implement the logic to remove the notice from the user's favorites - how this collection will be called?
        // will be notice or ad in Favorites collection/document?
        const removedFavorite = await Favorite.findOneAndRemove({user: userId, notice: favId});
        return removedFavorite;
        } catch (error) {
        throw error;
        }
}

module.exports = {
    getNoticesByCategory,
    getNoticeById,
    addToFavorites,
    getNotifications,
    removeFromFavorites
}

