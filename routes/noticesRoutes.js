const express = require("express");
const router = express.Router();
const {
  addNotice,
  getNoticesByCategory,
  getNoticeById,
  addToFavorites,
  removeFromFavorites,
  getMyNotices,
  deleteMyNotice,
  getFavoriteNotices,
} = require("../controllers/noticesController");
const { asyncWrapper } = require("../helpers/apiHelpers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { upload } = require('../middlewares/upload');
const {schemas} = require('../models/noticesModel')
const validateBody = require('../middlewares/validateBody');


// create an endpoint to add ads according to the selected category
router.post("/", authMiddleware, upload.single('photo'), validateBody(schemas.noticeValidateSchema), asyncWrapper(addNotice));

// create an endpoint for receiving my ads 
router.get("/", authMiddleware, asyncWrapper(getMyNotices));

// create an endpoint to receive a single ad
router.get("/:id", asyncWrapper(getNoticeById));

//  create an endpoint to delete an authorized user's ad created by the same user
router.delete("/:id", authMiddleware, asyncWrapper(deleteMyNotice));

// create an endpoint for receiving ads by category and using search query
router.get("/category/:categoryName", asyncWrapper(getNoticesByCategory));

// create an endpoint to receive ads of an authorized user added by him to his favorites
router.patch("/favorites/:id", authMiddleware, asyncWrapper(addToFavorites));

// create an endpoint to delete the ad of the authorized user added by the same to the favorites
router.put("/favorites/:id", authMiddleware, asyncWrapper(removeFromFavorites));

// create an endpoint to receive ads of an authorized user created by the same user
router.get("/favorites/all", authMiddleware, asyncWrapper(getFavoriteNotices));


module.exports = router;
