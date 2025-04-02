const express = require('express');
const { userValidationRules } = require('../../validators/user');
const userController = require('../../controllers/user');
const router = express.Router();

router.post('/create', userValidationRules(), userController.create);
router.post('/update/:id', userValidationRules(), userController.update);
router.get('/delete/:id', userValidationRules(), userController.delete);

module.exports = router;
