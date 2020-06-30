const mongoose = require('mongoose');
const Scheema = mongoose.Schema;

const LocationSchema = new Scheema({

    Location_ID: {
        type: Number,

    },
    LocationName: {
        type: String,
        //required:true
    },
    Discription: {
        type: String,
        //required:true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = admin = mongoose.model('Location', LocationSchema);