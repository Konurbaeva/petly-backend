const express = require('express');
const router = express.Router();

const { registerController } = require('../controllers/userControllers');



const { asyncWrapper } = require('../helpers/apiHelpers');

router.post('/register', asyncWrapper(registerController));

module.exports = router
