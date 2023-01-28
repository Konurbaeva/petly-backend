const express = require("express");
const jwt = require('jsonwebtoken');

const router = express.Router();

const { getNoticesByCategory, getNoticeById, addToFavorites, removeFromFavorites } = require("../../controllers")

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


 router.post("/notices/favorites/:id", async(req, res) => {
  // TODO check in mongo DB collection if userId/_userId/_id
   try {
   const userId = req.body.userId;
   const favId = req.params.id;
   const favorite = await addToFavorites(userId, favId);
   res.json(favorite);
   }  catch(error) {
    res.status(500).send(error);
   }
 })

 router.delete("/notices/favorites/:id", async (req, res) => {
  try {
  const userId = req.user._id;
  const favId = req.params.id;
  const removedFavorite = await removeFromFavorites(userId, favId);
  res.json(removedFavorite);
  } catch (error) {
  res.status(500).send(error);
  }
  });
 
module.exports = router;
