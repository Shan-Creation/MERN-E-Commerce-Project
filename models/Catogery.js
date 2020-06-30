const mongoose = require('mongoose');
const Scheema = mongoose.Schema;

const CatogerySchema = new Scheema({

    Catogery_ID: {
        type: Number,

    },
    CatogeryName: {
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

module.exports = catogery = mongoose.model('catogery', CatogerySchema);