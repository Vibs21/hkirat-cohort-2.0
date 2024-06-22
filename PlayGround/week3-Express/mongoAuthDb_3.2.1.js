const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const jwtPassword = '123456'; // consider it as a key, who has it will be able to check token is authentic or not

const app = express();
app.use(express.json());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    'mongodb+srv://vaibhavbajpayee2109:btv8U5TYzlFeqMUG@cluster0.itw4lsa.mongodb.net/userapp'
  );
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('Users', userSchema);

function userExists(username, password) {
  console.log('userName', username);
  return ALL_USERS.filter((user) => {
    return user.username === username && user.password === password;
  });
}

app.post('/signup', async function (req, res) {
  const { name, email, password } = req.body;

  const isUserExist = await User.findOne({ email: email });

  if (isUserExist) {
    return res.status(400).json({ msg: 'User already exist!' });
  } else {
    const user = new User({
      name: name,
      email: email,
      password: password,
      kaitari: 'not in schema, so not saving in DB',
    });
    user.save();
    return res.json({ msg: 'User created successfully!' });
  }
});

app.post('/signin', (req, res) => {
  const { username, password } = req.body;
  const isUserExist = userExists(username, password);
  console.log('isUserExist: ', isUserExist);
  if (!(isUserExist.length === 1)) {
    res.status(401).json({ msg: ' Username or Password is incorrect' });
    return;
  }
  const expiresIn = 3600;
  const token = jwt.sign({ username: username }, jwtPassword, { expiresIn });
  res.status(200).json({ token: token });
});

app.get('/users', (req, res) => {
  // console.log(req.headers);
  const token = req.headers.authorization;
  try {
    const decoded = jwt.decode(token, jwtPassword);
    res.send({
      userName: decoded.username,
      userList: ALL_USERS.filter((val) => {
        if (val.username == decoded.username) {
          return false;
        } else {
          return true;
        }
      }),
    });
  } catch {
    res
      .status(401)
      .json({ msg: 'You do not have permission to access this route!' });
  }
});

app.listen(3000);
