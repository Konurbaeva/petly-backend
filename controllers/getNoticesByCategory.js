// const getNoticesByCategory = categoryName => {
//     return Notices.find({ categoryName });
//   }
  
const getNoticesByCategory = async(categoryName) => {
    const {categoryName} = req.params
    const result = await Notices.find({ categoryName })

    if(!result) {
        throw Error(404, "Not found")
    }
    res.json(result)
  }

  module.exports = getNoticesByCategory