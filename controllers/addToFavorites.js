const { RequestError } = require("../helpers")

const addToFavorites = async(userId, favId) => {
    const result = await User.findOneAndUpdate({ _id: userId }, { $push: { favorites: favId } }, { new: true });
   
    if(!result) {
        throw RequestError(404, "Not found")
    }
    res.json(result)
}

module.exports = addToFavorites


