var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

var passport = require('passport');

var contactList = require('../model/contactList');

var contactController = require('../controllers/contactList')

//Authanticate User and Gaurd
function requireAuth(req, res, next){

    if(!req.isAuthenticated()){

        return res.redirect('/login');
    } next();

}

router.get('/',contactController.displayContactList);
/*
router.get('/add',requireAuth,contactController.displayAddPage);

router.post('/add', requireAuth,contactController.processAddPage);
*/
router.get('/add',contactController.displayAddPage);

router.post('/add', contactController.processAddPage);

router.get('/edit/:id',requireAuth,contactController.displayEditPage)

router.post('/edit/:id',requireAuth,contactController.processEditPage)

router.get('/delete/:id',requireAuth,contactController.performDelete)


module.exports = router;