
const getNotifications = async(userId) => {
    const result = await Notices.findOne({ _id: userId }).populate('notifications');
    if(!result) {
        throw RequestError(404, "Not found")
    }
    res.json(result)
}

module.exports = getNotifications