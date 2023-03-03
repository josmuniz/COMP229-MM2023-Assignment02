var mongoose = require('mongoose');
var contactModel = mongoose.Schema({
    name: String,
    phone: String,
    email: String
},
    {
        collection: "contact"
    });

module.exports = mongoose.model('contact', contactModel);

