const mongoose = require('mongoose');
const Scheema = mongoose.Schema;

const ProductSchema = new Scheema({

    product_ID: {
        type: Number,

    },
    user_ID: {
        type: String,
        required: true

    },
    Product_Name: {
        type: String,
        required: true
    },
    Product_Discription: {
        type: String,
        //required:true
    },
    Product_Brand: {
        type: String,
        //required:true
    },
    Product_Price: {
        type: String,
        //required:true
    },
    date: {
        type: Date,
        default: Date.now
    },
    Image: {
        type: String

    },
    UserID: {
        type: String
    },
    Aproved: {
        type: Boolean,
        default: false
    },
    Payments: {
        Amount: Number,
        Days: Number,
        ResiptNo: String
    },
    Promoted: {
        type: Boolean,
        default: false
    }

});

module.exports = Product = mongoose.model('product', ProductSchema);