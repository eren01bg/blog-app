const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validationMiddleware = require('../middlewares/validationMiddleware');

// Register a new user
router.post('/register', validationMiddleware.validateRegistration, userController.registerUser);

// Login a user

router.post('/login', validationMiddleware.validateLogin, userController.loginUser);

router.get('/user/:id', userController.getUser);

module.exports = router;
