const { Router } = require('express');
const router = Router();
const userMiddleware = require('../middleware/user');
const { User, Course } = require('../db');

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

router.post('/signin', (req, res) => {
    // Implement admin signup logic
});

router.get('/courses', async (req, res) => {
  // Implement listing all courses logic
  const course = await Course.find();
  res.json({ courses: course });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const { username } = req.headers;
  await User.updateOne(
    {
      username: username,
    },
    { $push: { purchasedCourses: courseId } }
  );
  res.json({ message: 'Course purchased successfully' });
  console.log('user details', user, courseId);
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const { username } = req.headers;

  const user = await User.findOne({
    username: username,
  });
  console.log('purchasedCourses', user.purchasedCourses);

  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });

  res.json({ purchasedCourses: courses });
});

module.exports = router;
