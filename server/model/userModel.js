var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var user = mongoose.Schema(
    {
        username:{
            type: String,
            default: "",
            trim: true,
            required: "username is required"
        },
        email:{
            type: String,
            default: "",
            trim: true,
            required: "email is required"
        },
        displayName:{
            type: String,
            default: "",
            trim: true,
            required: "Display Name is required"
        },
        dateCreated:{
            type: Date,
            default: Date.now,
        },
        dateUpdated:{
            type: Date,
            default: Date.now,
        }
        /*
        password:{
            type: String,
            default: "",
            trim: true,
            required: "password is required"
        }
        */
    },
    {
        collection: "users"
    }
);
var options = ({missingPasswordError:"Wrong/ Missing Password"});

user.plugin(passportLocalMongoose, options);

module.exports.user = mongoose.model('userModel', user);