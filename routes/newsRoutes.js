const express = require("express");

const  getAllNews = require("../controllers/getAllNews");
const { asyncWrapper } = require("../helpers/apiHelpers");

const router = express.Router();

router.get("/", asyncWrapper(getAllNews));

module.exports = router;
