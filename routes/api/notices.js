const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get("/notices/:categoryName", async (req, res, next) => {
 const { categoryName } = req.params;
 
 const notices = getNoticesByCategory(categoryName);
  res.json(notices);
});

router.get("/notices/:id", async (req, res, next) => {
  const {id } = req.params;
  
  const notice = getNoticeById(id);
  if (notice) {
    res.json(notice);
  } else {
    res.status(404).send("Notice not found");
  }
 });


 router.post("/notices/favorites/:id", (req, res) => {
  // TODO check in mongo DB collection if userId/_userId/_id
   const userId = req.body.userId;
   const favId = req.params.id;

   addToFavorites(userId, favId)
   .then((favorite) => {
     res.json(favorite);
   })
   .catch((err) => {
     res.status(500).send(err);
   });
 })

 app.get("/notifications", (req, res) => {
  const userId = req.user._id;

  getNotifications(userId)
  .then((notifications) => {
    res.json(notifications);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
 })
 

module.exports = router;
