const { Router } = require('express');
const { User, Account } = require('../db/db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, SALT_ROUND } = require('../config');
const isUserAthenticated = require('../middleware/userAuthMiddleware');
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

    // signupBody.safeParse(req.body)

  const { userName, firstName, lastName, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
  try {
    const user = await User.create({
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword,
      balance: 0,
      date: new Date(),
    });
    Account.create({
      userId: user._id,
      balance: 1000
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
  try {
    const userDetails = await User.findOne({userName: userName});
    const matchResult = await bcrypt.compare(password, userDetails.password)
    if(matchResult) {
      const token = jwt.sign({ userName, userId: userDetails._id }, JWT_SECRET);
      return res.status(201).json({ message: 'user logged in successfully', token: token });
    } else {
      return res.status(401).json({ message: 'Invalid Credentials!' });
    }
     
  } catch (err) {
    return res.status(404).json({ message: 'Invalid Credentials!' });
  }
});

router.put('/user/update', isUserAthenticated, async (req, res) => {
    const { firstName, lastName, password } = req.body;
    const filter = {userName: req.userName};
    const update = {firstName: firstName, lastName: lastName};
    try {
      //NOTE: It's very important to add await in from of query, or else DB won't get updated,
      // before every call put await
        await User.findOneAndUpdate(filter, update);
        return res.status(200).send({message: "Details updated successfully!"})
        
    } catch(err) {

    }
})

router.get("/bulk", isUserAthenticated, async (req, res) => {
  const filter = req.query.filter || "";

  console.log('filter', filter)

  const users = await User.find({
      $or: [{
          firstName: {"$regex": filter, $options: 'i' } //NOTE: i for case-insensative
        }
      ]
  }).select('userName firstName lastName _id')

//   , {
//     lastName: {
//         "$regex": filter
//     }
// }
  return res.send({users: users})
})

router.get('/user/fetchallUsers', isUserAthenticated, async (req, res) => {
  const data = await User.find().select('userName firstName');
  res.json({ data: data });
});

module.exports = router;
