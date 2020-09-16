const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  //get token from header
  const token = req.header('x-auth-token');

  console.log(token);
  //check if no token
  if (!token) {
    console.log('entered');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  let secret;
  if (!process.env.HEROKU) {
    const config = require('config');
    secret = config.get('jwtSecret');
  } else {
    secret = process.env.jwtSecret;
  }
  //verify token
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log('entered');
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
