const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const validationMiddleware = require('../middlewares/validationMiddleware');


router.post('/', categoryController.createCategories);
router.get('/:id', categoryController.getCategoryById)
router.get('/', validationMiddleware.validateToken, categoryController.getCategories);

module.exports = router;
