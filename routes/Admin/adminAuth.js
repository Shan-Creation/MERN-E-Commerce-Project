const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const adminAuth = require('../../midleware/adminAuth');
const Admin = require('../../models/Admin');
const jwt = require('jsonwebtoken');


router.post('/', (req, res) => {
    const { userName, password } = req.body;
    //validate inputs
    if (!userName || !password) {
        return res.status(400).json({ msg: "please enter all fields...." });
    }
    //check for user exist
    Admin.findOne({ userName }).then(admin => {
        if (!admin) return res.status(400).json({ msg: "Acess Denide..." });

        //validate password
        bcrypt.compare(password, admin.password)
            .then(isMatch => {
                if (!isMatch) return res.status(400).json({ msg: 'Invalid Password' });

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

                            Admin: {
                                id: admin._id,
                                userName: admin.userName

                            }
                        });
                    }
                )
            })
    })
});

router.get('/', (req, res) => {
    console.log("hit get admins")
    Admin.find().select('_id')
        .then(admin => res.json(admin));

});

// router.get('/admin', adminAuth, (req, res) => {
//     Admin.findById(req.admin.id).select('-password')
//         .then(admin => res.json(admin));

// });
module.exports = router;