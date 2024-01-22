const express = require('express');
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());


const ALL_USERS = [
    {
      username: "harkirat@gmail.com",
      password: "123",
      name: "harkirat singh",
    },
    {
      username: "vaibhav@gmail.com",
      password: "123321",
      name: "Vaibhav Bajpayee",
    },
    {
      username: "priya@gmail.com",
      password: "123321",
      name: "Priya kumari",
    },
  ];

function userExists(username, password) {
    console.log('userName', username);
    return (ALL_USERS.filter((user)=> { 
      return user.username === username && user.password === password
    })) > 0
}

app.post('/signin', (req, res) => {
    const {username, password} = req.body; 
    const isUserExist = userExists(username, password);
    console.log('isUserExist: ', isUserExist);
    if(!isUserExist) {
      res.status(401).json({'msg': ' Username or Password is incorrect'})
    } 
    res.status(200).json({'msg': isUserExist});
});

app.get('/users', (req, res)=> {
    // console.log(req.headers);
    res.send({'usersList': ALL_USERS})
})


app.listen(3000);