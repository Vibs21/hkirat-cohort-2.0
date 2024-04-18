const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const words = token.split(" ") ;
    const jwt_token = words[1];

    const decoded_jwt = jwt.verify(jwt_token, JWT_SECRET);

    if(decoded_jwt.username) {
        res.decoded_jwt = decoded_jwt;
        next();
    } else {
        res.status(401).json({message: "you are not authenticated!"})
    }
}

module.exports = userMiddleware;