const mongoose = require('mongoose');
const Scheema = mongoose.Schema;

const PImageSchema = new Scheema({

   
    PImageName:{
        type:String,
        required:true
    }
});

module.exports = Image = mongoose.model('image', PImageSchema);