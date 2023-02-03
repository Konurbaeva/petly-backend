const express = require("express");
const router = express.Router();
const {
  addNotice,
  getNoticesByCategory,
  getNoticeById,
  addToFavorites,
  removeFromFavorites,
  getMyNotice,
  deleteMyNotice,
  getFavoriteNotices,
} = require("../controllers/noticesController");
const { asyncWrapper } = require("../helpers/apiHelpers");
const { authMiddleware } = require("../middlewares/authMiddleware");

// create an endpoint to add ads according to the selected category
router.post("/", authMiddleware, asyncWrapper(addNotice));

// create an endpoint for receiving ads by category
router.get("/category/:categoryName", asyncWrapper(getNoticesByCategory));

// create an endpoint to receive a single ad
router.get("/:id", asyncWrapper(getNoticeById));

// create an endpoint to receive ads of an authorized user created by the same user
router.get("/favNotices", asyncWrapper(getFavoriteNotices));

router.get("/myNotice", authMiddleware, asyncWrapper(getMyNotice));
//  create an endpoint to delete an authorized user's ad created by the same user
router.delete("/:id", authMiddleware, asyncWrapper(deleteMyNotice));

// create an endpoint to receive ads of an authorized user added by him to his favorites
router.post("/favorites/:id", authMiddleware, asyncWrapper(addToFavorites));

// router.delete(
//   "/notices/favorites/:id",
//   authMiddleware,
//   asyncWrapper(getNoticeById)
// );

// create an endpoint to delete the ad of the authorized user added by the same to the favorites
router.delete(
  "/favorites/:id",
  authMiddleware,
  asyncWrapper(removeFromFavorites)
);

module.exports = router;
