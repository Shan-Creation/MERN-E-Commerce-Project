const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const auth = require('../../midleware/auth');
const User = require('../../models/users');
const jwt = require('jsonwebtoken');


router.post('/', (req, res) => {
    const { email, password } = req.body;
    //validate inputs
    if (!email || !password) {
        return res.status(400).json({ msg: "please enter all fields...." });
    }
    //check for user exist
    User.findOne({ email }).then(user => {
        if (!user) return res.status(400).json({ msg: "User user doesn't  exists" });

        //validate password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (!isMatch) return res.status(400).json({ msg: 'Invalid Password' });

                jwt.sign(
                    //add payload to token which data we want to carry on token
                    {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    },
                    config.get('jwtSecret'),
                    { expiresIn: 3600 },
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
});

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id).select('-password')
        .then(user => res.json(user));

});
module.exports = router;