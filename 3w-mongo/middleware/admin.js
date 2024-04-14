// Middleware for handling auth
const { Admin } = require('../db');
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const username = req.headers.username;
  const password = req.headers.password;

  console.log('inside admin middleware', username, password);

  Admin.findOne({ username: username, password: password }).then((val) => {
    if (val !== null) {
      console.log('val', val);
      next();
    } else {
      res.status(403).json({ message: 'You are not authorized!' });
    }
  });
}

module.exports = adminMiddleware;
