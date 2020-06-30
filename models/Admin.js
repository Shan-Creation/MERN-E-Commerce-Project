const mongoose = require('mongoose');
const Scheema = mongoose.Schema;

const AdminSchema = new Scheema({

    admin_ID: {
        type: Number,

    },
    userName: {
        type: String,
        //required:true
    },
    password: {
        type: String,
        //required:true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = admin = mongoose.model('Admin', AdminSchema);