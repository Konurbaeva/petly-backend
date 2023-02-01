const express = require("express");
const router = express.Router();
const {
  addNotice,
  getNotifications,
  getNoticesByCategory,
  getNoticeById,
  addToFavorites,
  removeFromFavorites,
  updateNotice
} = require("../controllers/noticesController");
const { asyncWrapper } = require("../helpers/apiHelpers");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post(
  "/notices",
  authMiddleware,
  asyncWrapper(addNotice)
);

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

router.put(
  "/notices/favorites/:id",
  authMiddleware,
  asyncWrapper(updateNotice)
);

// router.delete(
//   "/notices/favorites/:id",
//   authMiddleware,
//   asyncWrapper(getNoticeById)
// );

router.delete(
  "/notices/favorites/:id",
  authMiddleware,
  asyncWrapper(removeFromFavorites)
);

module.exports = router;
