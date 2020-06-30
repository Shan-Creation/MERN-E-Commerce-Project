const mongoose = require('mongoose');
const Scheema = mongoose.Schema;

const UserSchema = new Scheema({

    user_ID: {
        type: Number,

    },
    name: {
        type: String,
        //required:true

    },
    lname: {
        type: String,
        //required:true
    },
    email: {
        type: String,
        //required:true
    },
    phone: {
        type: String,
        //required:true
    },
    password: {
        type: String,
        //required:true
    },
    address: {
        type: String,
        //required:true
    },
    date: {
        type: Date,
        default: Date.now
    },
    Image: {
        type: String
    }


});

module.exports = user = mongoose.model('user', UserSchema);