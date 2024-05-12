const mongoose = require("mongoose");


const db = mongoose.connect('mongodb+srv://vaibhavbajpayee2109:1YaMUvGf8HPeKiqK@paytm.oaoeo4b.mongodb.net/paytm');

const userSchema = new mongoose.Schema({
    name: String,
    password: String
})

const userModel = mongoose.model('Users', userSchema);

//fire query using userModel

module.exports = {userModel}