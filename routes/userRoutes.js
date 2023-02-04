const express = require('express');
const router = express.Router();

const { registerController, loginController, getCurrentController, logoutController, updateController, avatarController, getStatusController } = require('../controllers/userControllers');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { asyncWrapper } = require('../helpers/apiHelpers');
const validateBody = require('../middlewares/validateBody');
const { upload } = require('../middlewares/upload')
const {schemas} = require('../models/userModel')


router.post('/register', validateBody(schemas.registerSchema), asyncWrapper(registerController));
router.post('/login', validateBody(schemas.loginSchema), asyncWrapper(loginController));
router.get('/current', authMiddleware, asyncWrapper(getCurrentController));
router.get('/status', authMiddleware, asyncWrapper(getStatusController));
router.get('/logout', authMiddleware, asyncWrapper(logoutController));
router.patch('/update', authMiddleware, validateBody(schemas.updateFieldSchema), asyncWrapper(updateController));
router.patch('/avatar', authMiddleware, upload.single('avatar'), asyncWrapper(avatarController))

module.exports = router
