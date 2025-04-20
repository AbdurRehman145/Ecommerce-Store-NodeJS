const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attaches the user ID to the request
    next();
  } catch (err) {
    res.clearCookie('token');
    return res.redirect('/login');
  }
}


module.exports = { authenticate };
