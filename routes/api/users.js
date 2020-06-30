const express = require('express');
const router = express.Router(); //Get forntend require 
const bcrypt = require('bcryptjs'); //Password to hush
const config = require('config');

const User = require('../../models/users');
const jwt = require('jsonwebtoken'); //Send to Fornend the token


router.post('/', (req, res) => {
    const { name, email, password, lname, phone, id, address } = req.body; //Signup data are save
    //validate inputs
    if (!name || !email || !password) {
        return res.status(400).json({ msg: "please enter all fields" });
    }
    //check for user exist
    User.findOne({ email }).then(user => {
        if (user) return res.status(400).json({ msg: "User already exists" });

        const newUser = new User({
            id,
            name,
            lname,
            email,
            address,
            phone,
            password

        });

        //create hush
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;

                newUser.password = hash;
                newUser.save().then(user => {
                    jwt.sign(
                        //add payload to token which data we want to carry on token
                        {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },  // 1 hous token ara expires. New token are want agen
                        (err, token) => {
                            if (err) throw err;

                            res.json({
                                token,

                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )


                })
            })
        })
    })


});

router.get('/:id', (req, res) => { //localhost:5000/api/products
    console.log(req.params.id);
    const id = req.params.id;
    //console.log(id);
    User.findOne({ _id: id })
        .then(user => res.json(user))

});

module.exports = router;