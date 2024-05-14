const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");

const isUserAthenticated = (req, res, next) => {
    const header = req.headers.authorization;
    let token = header.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("decoded", decoded)
        next();
    } catch(err) {
        console.log("error", err)
        res.status(401).json({message: "You are not Authenticated!"})
    }
    // const decode = jwt.decode()
}


module.exports = isUserAthenticated