const express = require("express");

const servicesController = require("../controllers/servicesController");
const { asyncWrapper } = require("../helpers/apiHelpers");

const router = express.Router();

router.get("/", asyncWrapper(servicesController));

module.exports = router;
