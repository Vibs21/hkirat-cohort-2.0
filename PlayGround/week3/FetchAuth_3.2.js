const express = require('express');
const jwt = require("jsonwebtoken");
const jwtPassword = "123456"; // it's kind of act like a key, who has it will be able to decrypt or encrypt

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
    return ALL_USERS.filter((user)=> { 
      return user.username === username && user.password === password
    })
}

app.post('/signin', (req, res) => {
    const {username, password} = req.body; 
    const isUserExist = userExists(username, password);
    console.log('isUserExist: ', isUserExist);
    if(!(isUserExist.length === 1)) {
      res.status(401).json({'msg': ' Username or Password is incorrect'})
      return;
    }
    const token = jwt.sign({username: username}, jwtPassword); 
    res.status(200).json({'token': token});
});

app.get('/users', (req, res)=> {
    // console.log(req.headers);
    const token = req.headers.authorization;
    try {
      const decoded = jwt.decode(token, jwtPassword);
      res.send({'usersList': decoded.username});
    } catch {
      res.status(401).json({'msg': 'You do not have permission to access this route!'})
    }
})


app.listen(3000);