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
  getSearchQuery
} = require("../controllers/noticesController");
const { asyncWrapper } = require("../helpers/apiHelpers");
const { authMiddleware } = require("../middlewares/authMiddleware");

// create an endpoint to add ads according to the selected category
router.post(
  "/notices",
  authMiddleware,
  asyncWrapper(addNotice)
);

// no need of this route getNotifications
// router.get("/notices", authMiddleware, asyncWrapper(getNotifications));

// create an endpoint for receiving ads by category
// correct, no need for authMiddleware
router.get(
  "/notices/:categoryName",
  asyncWrapper(getNoticesByCategory)
);

//create an endpoint to receive a single ad
// no need for authMiddleware
router.get("/notices/:id", asyncWrapper(getNoticeById));

//create an endpoint to receive ads of an authorized user created by the same user
//no need for authMiddleware
router.get("/notices/myNotice", authMiddleware, asyncWrapper(getMyNotice));
// create an endpoint to delete an authorized user's ad created by the same user
//no need for authMiddleware
router.delete("/notices/myNotice", authMiddleware, asyncWrapper(deleteMyNotice));


//create an endpoint to receive ads of an authorized user added by him to his favorites
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

// create an endpoint to delete the ad of the authorized user added by the same to the favorites
router.delete(
  "/notices/favorites/:id",
  authMiddleware,
  asyncWrapper(removeFromFavorites)
);

router.get(
  "/search?q=keyword",
  asyncWrapper(getSearchQuery)
);

module.exports = router;
