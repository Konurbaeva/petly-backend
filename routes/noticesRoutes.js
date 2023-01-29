const express = require("express");
const router = express.Router();
const {
  getNotifications,
  getNoticesByCategory,
  getNoticeById,
  addToFavorites,
  // removeFromFavorites,
} = require("../../controllers");
const { asyncWrapper } = require("../helpers/apiHelpers");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get("/notices", authMiddleware, asyncWrapper(getNotifications));

router.get(
  "/notices/:categoryName",
  authMiddleware,
  asyncWrapper(getNoticesByCategory)
);

router.get("/notices/:id", authMiddleware, asyncWrapper(getNoticeById));

router.post(
  "/notices/favorites/:id",
  authMiddleware,
  asyncWrapper(addToFavorites)
);

// router.delete(
//   "/notices/favorites/:id",
//   authMiddleware,
//   asyncWrapper(getNoticeById)
// );

module.exports = router;
