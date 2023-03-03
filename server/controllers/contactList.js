/*   Author- Jose Muniz    
     StudentID-301316969     
     Last Updated on 03/03/2023 
*/
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

var contactList = require('../model/contactList');

module.exports.displayContactList = (req, res, next) => {
    contactList.find((err, BookList) => {
        if (err) return console.error(err)
        else {
            //console.log(BookList)
            res.render('contactBook/list', {
                title: 'Contact List',
                BookList  
            });
        }

    });
}

module.exports.displayAddPage =  (req, res, next) => {
    res.render('contactBook/add', {
        title: 'Add Contact',
        displayName : req.user ? req.user.displayName : ''
    })
}

module.exports.processAddPage = (req, res, next) => {

    var newContact = contactList({
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email
    });
    contactList.create(newContact, (err, BookList) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/contactList');
        }
    })
}

module.exports.displayEditPage =(req, res, next) => {
    var id = req.params.id;

    contactList.findById(id, (err, contactToUpdate) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('contactBook/edit', {
                title: "Edit Contact",
                contact: contactToUpdate,
                displayName : req.user ? req.user.displayName : ''
            })
        }
    });
}

module.exports.processEditPage =   (req, res, next) => {
    var id = req.params.id;

    var updatedContact ={
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email
    }
    console.log(updatedContact)
    contactList.updateOne({_id : id}, updatedContact, (err)=>{
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/contactList');
        }
    });

}


module.exports.performDelete = (req, res, next) => {
    var id = req.params.id;

    contactList.remove({_id : id}, (err)=>{
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/contactList');
        }
    });
}
