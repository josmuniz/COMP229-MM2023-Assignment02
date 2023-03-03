let express = require('express');
const contactList = require('../model/contactList');

let router = express.Router();

let indexController = require('../controllers/index');


/* GET home page. */
router.get('/', indexController.displayHomePage);

router.get('/home', indexController.displayHomePage);

router.get('/aboutme', indexController.displayAboutMePage);

router.get('/projects', indexController.displayProjectsPage);

router.get('/services', indexController.displayServicesPage);

router.get('/contacts', indexController.displayContactsPage);

/* Services login */
router.get('/login',indexController.displayLoginPage);

router.get('/register',indexController.displayRegisterPage);

router.post('/login',indexController.performLoginPage);

router.post('/register',indexController.performRegisterPage);

router.get('/logout', indexController.performLogout);


module.exports = router;
