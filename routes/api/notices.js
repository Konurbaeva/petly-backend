const express = require("express");
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

 

module.exports = router;
