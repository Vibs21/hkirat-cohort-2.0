const { User } = require('../db');

const userMiddleware = async function (req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const { username, password } = req.headers;
    console.log('user', username, password);

    const user = await User.find({
        username: username,
        password: password
    })
    if(user && user[0]){
        next();
    } else {
        return res.status(403).json({'message': 'User does not exist'});
    }
}

module.exports = userMiddleware;