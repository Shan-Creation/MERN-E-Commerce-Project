const mongoose = require('mongoose');
const Scheema = mongoose.Schema;

const BanerSchema = new Scheema({

    baner_ID: {
        type: Number,

    },
    baner_Name: {
        type: String,

    },

    date: {
        type: Date,
        default: Date.now
    },
    Image: {
        type: String,
        require: true

    },


});

module.exports = Baner = mongoose.model('Baner', BanerSchema);