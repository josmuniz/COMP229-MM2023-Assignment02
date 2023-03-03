var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var passport = require('passport')

var userModel = require('../model/userModel')
var user = userModel.user;

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home', displayName : req.user ? req.user.displayName : '' });
}
module.exports.displayProjectsPage = (req, res, next) => {
    res.render('index', { title: 'Projects', displayName : req.user ? req.user.displayName : ''  });
}
module.exports.displayContactsPage = (req, res, next) => {
    res.render('index', { title: 'Contact Me', displayName : req.user ? req.user.displayName : ''  });
}
module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { title: 'Services', displayName : req.user ? req.user.displayName : ''  });
}
module.exports.displayAboutMePage = (req, res, next) => {
    res.render('index', { title: 'About Me', displayName : req.user ? req.user.displayName : ''  });
}
module.exports.displayLoginPage = (req, res, next) => {
    if(!req.user){
        res.render('index', {
             title: 'Login',
             messages: req.flash('loginMessage'),
             displayName: req.user ? req.user.displayName : ''
            });
    } else return res.redirect('/')

}
module.exports.performLoginPage = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            return next(err);
        }
        if(!user){
            req.flash('loginMessage','Authentication Error');
        }
        req.login(user, (err)=> {
            if(err) return next(err);
            return res.redirect('/contactList');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    if(!req.user){
        res.render('index', {
             title: 'Register',
             messages: req.flash('registerMessage'),
             displayName: req.user ? req.user.displayName : ''
            });
    } else return res.redirect('/')
}

module.exports.performRegisterPage = (req, res, next) => {

    var newUser = user({
        "username": req.body.username,
        "password": req.body.password,
        "displayName": req.body.displayName,
        "email": req.body.email
    });

    user.register(newUser, req.body.password,(err) => {
        if (err) {
            console.log('Error in Register');
            if(err.name == 'userExistsError'){
                req.flash(
                    'registerMessage',
                    'Registration Error : User Already Exists!'
                );
                console.log('User Already Exists')
            }
            return res.render('index', {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
               });
        } else {
            return passport.authenticate('local')(req,res, ()=>{
                res.redirect('/contactList')
            })
        }
    })


    res.render('index', { title: 'Register' });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}




/*
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home'});
}
module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { title: 'About Me'});
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('index', { title: 'Projects'});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { title: 'Services'});
}

module.exports.displayContactsPage = (req, res, next) => {
    res.render('index', { title: 'Contact Me'});
}

module.exports.displayLoginPage = (req, res, next) => {
    if(!req.user){
        res.render('index', {
             title: 'Login',
             messages: req.flash('loginMessage'),
             displayName: req.user ? req.user.displayName : ''
            });
    } else return res.redirect('/')

}
module.exports.performLoginPage = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            return next(err);
        }
        if(!user){
            req.flash('loginMessage','Authentication Error');
        }
        req.login(user, (err)=> {
            if(err) return next(err);
            return res.redirect('/contactList');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    if(!req.user){
        res.render('index', {
             title: 'Register',
             messages: req.flash('registerMessage'),
             displayName: req.user ? req.user.displayName : ''
            });
    } else return res.redirect('/')
}

module.exports.performRegisterPage = (req, res, next) => {

    var newUser = user({
        "username": req.body.username,
        "password": req.body.password,
        "displayName": req.body.displayName,
        "email": req.body.email
    });

    user.register(newUser, req.body.password,(err) => {
        if (err) {
            console.log('Error in Register');
            if(err.name == 'userExistsError'){
                req.flash(
                    'registerMessage',
                    'Registration Error : User Already Exists!'
                );
                console.log('User Already Exists')
            }
            return res.render('index', {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
               });
        } else {
            return passport.authenticate('local')(req,res, ()=>{
                res.redirect('/contactList')
            })
        }
    })


    res.render('index', { title: 'Register' });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}


*/

