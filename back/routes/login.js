const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tutorba2021@gmail.com',
    pass: 'riadpreljevic93',
  },
});

const mailOptions = {
  from: 'tutorba2021@gmail.com', // sender address
  to: 'stefanlastric@gmail.com', // list of receivers
  subject: 'Subject of your email', // Subject line
  html: '<p>Your html here</p>', // plain text body
};

const User = require('../models/User');

//@route    GET auth
//@desc     Test route
//@access   public

router.get('/', auth, async (req, res) => {
  try {
    const user = await await User.findById(req.user.id)
      .populate('role')
      .select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
});

//@route    POST auth
//@desc     Authenticate user and get token
//@access   public
router.post(
  '/',
  [
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //see if user exists
      let user = await User.findOne({ email }).populate('role');
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }
      const payload = {
        user: {
          id: user.id,
          role: user.role.name,
        },
      };
      let secret;
      if (!process.env.HEROKU) {
        const config = require('config');
        secret = config.get('jwtSecret');
      } else {
        secret = process.env.jwtSecret;
      }

      jwt.sign(payload, secret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
        for (let i = 0; i < 10; i++) {
          transporter.sendMail(mailOptions, function (err, info) {
            if (err) console.log(err);
            else console.log(info);
          });
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error!');
    }
  }
);

module.exports = router;
