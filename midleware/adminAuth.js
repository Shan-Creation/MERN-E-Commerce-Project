const config = require('config');
const jwt = require('jsonwebtoken');

function adminAuth(req, res, next) {
    const token = req.header('x-auth-token');

    //check for token
    if (!token) return res.status(401).json({ msg: 'Authorization denid' });

    try {
        //veryfy token
        const decode = jwt.verify(token, config.get('jwtSecret'));

        // Add user from payload
        req.admin = decode;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'token is not valid' });
    }
}

module.exports = adminAuth;