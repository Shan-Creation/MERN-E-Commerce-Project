
const express = require('express');
const router = express.Router();

//const Baner = require('../../models/MainBaner');
const User = require('../../models/users');
const Product = require('../../models/Product');

var usr, prd;

router.get('/', (req, res) => {

    User.count().then(user => {
        console.log(user);
        if (user) {
            usr = user;
        }
    })

    Product.count().then(product => {
        if (product) {
            prd = product;
            return res.json({ user: usr, product: prd });
        }

    });

});

module.exports = router;