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
    return ALL_USERS.filter((user)=> { return user.username === username })
}

app.post('/signin', (req, res) => {
    const {username, password} = req.body; 
    const isUserExist = userExists(username);
    console.log('isUserExist: ', isUserExist);
    res.status(200).json({'msg': req.body});
});

app.get('/users', (req, res)=> {
    console.log(req.headers);
    res.send({'msg': 'hello this is working!'})
})


app.listen(3000);