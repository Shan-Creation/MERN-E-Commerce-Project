const mongoose = require('mongoose');
const Scheema = mongoose.Schema;

const ContactSchema = new Scheema({


    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        //required:true
    },
    Phone: {
        type: String,
        //required:true
    },
    Title: {
        type: String,
        //required:true
    },

    message: {
        type: String

    },

    viewed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Contact = mongoose.model('contact', ContactSchema);