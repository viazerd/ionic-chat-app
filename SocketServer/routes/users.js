const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');

router.post('/register',userController.create);
router.post('/authenticate',userController.authenticate);
router.get('/users',userController.getAll);
router.put('/logout/:userId',userController.logout);

module.exports = router;