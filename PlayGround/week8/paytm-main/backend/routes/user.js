const { Router } = require('express');
const isUserAthenticated = require('../middleware/user');
const { User } = require('../db');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
const router = Router();

//NOTE: Router module acts as a bridge to abstract the logic from the main index.js file to this and transactions file

router.post('/signup', isUserAthenticated, async (req, res) => {
  const { userName, password } = req.body;
  try {
    console.log('inside the if condition');
    await User.create({
      userName: userName,
      password: password,
      balance: 0,
      date: new Date(),
    });

    return res.send({ message: userName + ' ' + 'welcome onboard!' });
  } catch (err) {
    return res.status(404).json({ message: err });
  }
});

router.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    try {
        const userDetails = await User.findOne({
            userName: userName,
            password: password, // Ensure that the password is properly hashed and stored in the database
          });
          console.log( JWT_SECRET);
          const token = jwt.sign({ userName }, JWT_SECRET);

          return res.status(201).json({ message: 'user login successfully', token: token });
    } catch (err) {
      console.error('Error during login:', err);
      return res.status(404).json({ message: "something went wrong" });
    }
  });
  

router.get('/fetchallUsers', (req, res) => {
  userModel.find();
});

module.exports = router;
