const { Router } = require('express');
const { User } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, SALT_ROUND } = require('../config');
const isUserAthenticated = require('../middleware/user');
const bcrypt = require('bcrypt');
const router = Router();
const zod = require('zod');
//NOTE: Router module acts as a bridge to abstract the logic from the main index.js file to this and transactions file

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

router.post('/user/signup', async (req, res) => {
  
    //TODO: const { success } = signupBody.safeParse(req.body);

  const { userName, firstName, lastName, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
  try {
    await User.create({
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword,
      balance: 0,
      date: new Date(),
    });
    return res.send({ message: firstName + ' ' + 'welcome onboard!' });
  } catch (err) {
    return res
      .status(411)
      .json({ message: 'Email already taken / Incorrect inputs' });
  }
});

router.post('/user/signin', async (req, res) => {
  const { userName, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  //   const isCorect = await bcrypt.compare(password, hash);

  try {
    const userDetails = await User.findOne({
      userName: userName,
      password: hashedPassword, // Ensure that the password is properly hashed and stored in the database
    });
    console.log(JWT_SECRET);
    const token = jwt.sign({ userName }, JWT_SECRET);

    return res
      .status(201)
      .json({ message: 'user logged in successfully', token: token });
  } catch (err) {
    return res.status(404).json({ message: 'something went wrong' });
  }
});

router.get('/user/fetchallUsers', isUserAthenticated, async (req, res) => {
  const data = await User.find().select('userName firstName');
  res.json({ data: data });
});

module.exports = router;
