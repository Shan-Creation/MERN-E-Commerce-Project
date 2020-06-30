const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');

const Admin = require('../../models/Admin');
const jwt = require('jsonwebtoken');


router.post('/', (req, res) => {
    const { userName, password } = req.body;
    //validate inputs
    if (!userName || !password) {
        return res.status(400).json({ msg: "please enter all fields" });
    }
    //check for user exist
    Admin.findOne({ userName }).then(admin => {
        if (admin) return res.status(400).json({ msg: "admin already exists" });

        const newAdmin = new Admin({
            userName,
            password

        });

        //create hush
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                if (err) throw err;

                newAdmin.password = hash;
                newAdmin.save().then(admin => {
                    jwt.sign(
                        //add payload to token which data we want to carry on token
                        {
                            id: admin._id,
                            userName: admin.userName
                        },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;

                            res.json({
                                token,

                                admin: {
                                    id: admin._id,
                                    userName: admin.userName
                                }
                            });
                        }
                    )


                })
            })
        })
    })


});

module.exports = router;