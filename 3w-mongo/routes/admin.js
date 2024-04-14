const { Router } = require('express');
const adminMiddleware = require('../middleware/admin');
const router = Router();
const { Admin, Course } = require('../db');

// Admin Routes
router.post('/signup', async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;
  console.log(username, 'pass', password);
  const adminUser = new Admin({
    username: username,
    password: password,
  });
  try {
    await adminUser.save(); // Add await here to wait for the save operation to complete
    res.json({ message: 'Admin created successfully' }); // Move this line inside the try block to only send success message when save is successful
  } catch (error) {
    return res.status(403).json('Username already exists');
  }
});

//Headers: { 'username': 'username', 'password': 'password' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }

router.post('/courses', adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const { title, description, price, imageLink } = req.body;
  const course = new Course({
    title: title,
    description: description,
    price: price,
    imageLink: imageLink,
  });

  try {
    await course.save();
    res.json({
      message: 'Course created successfully',
      courseId: course._id,
    });
  } catch (error) {
    return res.status(403).json({ message: 'You are not Authorized!' });
  }
});

router.get('/courses', adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
   const course = await Course.find();
   if(course.length > 0) {
    res.json({courses: course});
   } else {
     res.status(404).json({ message: "No Courses Found" })
   }
});

module.exports = router;
