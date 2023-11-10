const express = require('express');
const router = express.Router();
const authController = require('../controllers/user.controller');

// Define authentication routes
router.post('/test1', authController.test1);
router.post('/test2', authController.test2);

module.exports = router;