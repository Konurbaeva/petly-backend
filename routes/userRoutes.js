const express = require('express');
const router = express.Router();

const { registerController, loginController, getCurrentController, logoutController } = require('../controllers/userControllers');
const { authMiddleware } = require('../middlewares/authMiddleware');


const { asyncWrapper } = require('../helpers/apiHelpers');

router.post('/register', asyncWrapper(registerController));
router.post('/login', asyncWrapper(loginController));
router.get('/current', authMiddleware, asyncWrapper(getCurrentController));
router.get('/logout', authMiddleware, asyncWrapper(logoutController));
module.exports = router
