const express = require('express');
const userController = require('../../controllers/user');
const router = express.Router();

router.get('/', (req, res)=>{
    userController.getAll(req, res)
});

router.get('/create', (req, res)=>{
    res.render('user/create_update')
});

router.get('/update/:id', (req, res)=>{
    userController.getById(req, res)
});

module.exports = router;
