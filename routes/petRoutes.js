const express = require('express');
const router = express.Router();

const { createPetController, removePetController } = require('../controllers/petControllers');

const { authMiddleware } = require('../middlewares/authMiddleware');
const { asyncWrapper } = require('../helpers/apiHelpers');
const validateBody = require('../middlewares/validateBody');
const { upload } = require('../middlewares/upload')
const {schemas} = require('../models/petModel')

router.post('/', authMiddleware, upload.single('photo'), validateBody(schemas.petValidateSchema), asyncWrapper(createPetController))
router.delete('/:petId', authMiddleware, asyncWrapper(removePetController));

module.exports = router
