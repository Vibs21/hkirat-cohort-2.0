// Middleware for handling auth
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const words = token.split(" ") ;
    const jwt_token = words[1];

    try {
        const decoded_jwt = jwt.verify(jwt_token, JWT_SECRET);
        next();
    } catch(err) {
        res.status(401).json({message: "you are not authenticated!"})
    }
}

module.exports = adminMiddleware;