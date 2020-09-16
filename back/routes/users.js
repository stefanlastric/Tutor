const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');
const User = require('../models/User');
const Role = require('../models/Role');
let secret;
if (!process.env.HEROKU) {
  const config = require('config');
  secret = config.get('jwtSecret');
} else {
  secret = process.env.jwtSecret;
}

const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tutorba2021@gmail.com',
    pass: 'riadpreljevic93',
  },
});

//@route    POST
//@desc     Register user admin role
//@access   public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 5 or more characters'
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const dbrole = await Role.findOne({ name: 'Admin' });
      //see if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      //new instance of user
      user = new User({
        name,
        email,
        password,
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      await User.findByIdAndUpdate(user._id, {
        $push: { role: dbrole._id },
      });

      const payload = {
        user: {
          id: user.id,
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
        const mailOptions = {
          from: 'tutorba2021@gmail.com', // sender address
          to: email, // list of receivers
          subject: 'Subject of your email', // Subject line
          html: '<p>Your html here</p>', // plain text body
        };
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) console.log(err);
          else console.log(info);
        });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error!');
    }
  }
);

//@route    GET users
//@desc     Get all users
//@access   public
router.get('/', auth, async (req, res) => {
  try {
    const userT = await User.findOne({ _id: req.user.id });
    const roles = await Role.findOne({ _id: userT.role });

    if (userT.role === null || roles.name != 'Admin') {
      return res.status(401).json({ msg: 'Authorization denied' });
    }
    const users = await User.find().populate('role');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// delete all users
router.delete('/', auth, async (req, res) => {
  try {
    await User.deleteMany();
    return res.status(200).json({ msg: 'success' });
  } catch (err) {
    console.error(err.message);
  }
});

//@route    GET users/roleid
//@desc     Get users by role
//@access   public
router.get('/:roleid', auth, async (req, res) => {
  try {
    const users = await User.find({ role: req.params.id }).populate('role');
    //check if users exist
    if (!users) {
      return res.status(404).json({ msg: 'Users does not exist' });
    }

    res.json(users);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

//@route    DELETE users/:id
//@desc     Delete user by id
//@access   private
router.delete('/:id', auth, async (req, res) => {
  try {
    const users = await Users.findById(req.params.id);
    //check if user is admin
    const userT = await User.findOne({ _id: req.user.id });
    const roles = await Role.findOne({ _id: userT.role });

    if (userT.role === null || roles.name != 'Admin') {
      return res.status(401).json({ msg: 'Authorization denied' });
    }
    if (!users) {
      return res.status(404).json({ msg: 'User does not exist' });
    }

    const user = await User.findById(req.user.id).select('-password');

    await users.remove();

    res.status(200).json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

//@route    PATCH users/:idpass
//@desc     Change pass request
//@access   public
router.patch('/pass', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // const data= (req.user.email)
  //       transporter.sendMail(data);

  try {
    const userT = await User.findOne({ _id: req.user.id });
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    userT.password = await bcrypt.hash(password, salt);
    await userT.save();
    return res.status(401).json({ msg: 'success' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.patch('/update-my-profile', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, surname } = req.body;

  try {
    const userT = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        name,
        surname,
      }
    );

    await userT.save();
    res.json({ user: userT });
    // return res.status(401).json({ msg: 'success' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
