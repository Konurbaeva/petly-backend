const express = require("express");

const router = express.Router();

router.get("/notices/:categoryName", async (req, res, next) => {
 const { categoryName } = req.params;
 
 const notices = getAdsByCategory(categoryName);
  res.json(notices);
});



module.exports = router;
