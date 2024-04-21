const { Router } = require('express');
const router = Router();
const userMiddleware = require('../middleware/user');
const { User, Course } = require('../db');
const {JWT_SECRET} = require('../config');
const jwt = require('jsonwebtoken');

// User Routes
router.post('/signup', async (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;
  try {
    const user = await User.create({
      username: username,
      password: password,
    });
    return res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    return res.status(401).json({ message: 'Username already exists.' });
  }
});

router.post('/signin', async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  const user = await User.find({
    username: username,
    password: password,
  });

  console.log('user', user)

  if (user[0]) {
    const token = jwt.sign({ username, type: 'user' }, JWT_SECRET);
    res.status(200).send({ token });
  } else {
    return res.status(401).json({ message: 'Invalid Credentials' });
  }
});

router.get('/courses', async (req, res) => {
  // Implement listing all courses logic
  const course = await Course.find();
  res.json({ courses: course });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const { username } = req.decoded_jwt;
  User.updateOne({
    username: username
  },{
    $push: {purchasedCourses: courseId}
  })
  await User.updateOne(
    {
      username: username,
    },
    { $push: { purchasedCourses: courseId } }
  );
  res.json({ message: 'Course purchased successfully' });
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const { username } = req.decoded_jwt;
  const user = await User.findOne({
    username: username,
  });
  console.log('purchasedCourses', user.purchasedCourses);

  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });

  console.log('courses', courses);

  res.json({ purchasedCourses: courses });
});

module.exports = router;
