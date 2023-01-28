const express = require('express');
const router = express.Router();

const { registerController, loginController, getCurrentController, logoutController, updateController } = require('../controllers/userControllers');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { asyncWrapper } = require('../helpers/apiHelpers');
const validateBody = require('../middlewares/validateBody');
const {schemas} = require('../models/userModel')


router.post('/register', validateBody(schemas.registerSchema), asyncWrapper(registerController));
router.post('/login', validateBody(schemas.loginSchema), asyncWrapper(loginController));
router.get('/current', authMiddleware, asyncWrapper(getCurrentController));
router.get('/logout', authMiddleware, asyncWrapper(logoutController));
router.patch('/update', authMiddleware, asyncWrapper(updateController));

module.exports = router
