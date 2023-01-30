const express = require('express');
const router = express.Router();

const { createPetController } = require('../controllers/petControllers');

const { authMiddleware } = require('../middlewares/authMiddleware');
const { asyncWrapper } = require('../helpers/apiHelpers');
// const validateBody = require('../middlewares/validateBody');
const { upload } = require('../middlewares/upload')
// const {schemas} = require('../models/userModel')


// router.post('/login', validateBody(schemas.loginSchema), asyncWrapper(loginController));

// router.patch('/avatar', authMiddleware, upload.single('avatar'), asyncWrapper(avatarController))

router.post('/', authMiddleware, upload.single('avatar'),  asyncWrapper(createPetController))

module.exports = router
