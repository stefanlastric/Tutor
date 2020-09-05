const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

let secret;
if (!process.env.HEROKU) {
  const config = require('config');
  secret = config.get('jwtSecret');
} else {
  secret = process.env.jwtSecret;
}

//@route    POST teacher
//@desc     Register a teacher
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
      //see if teacher exists
      let teacher = await User.findOne({ email });
      const dbrole = await Role.findOne({ name: 'Teacher' });
      if (teacher) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Teacher already exists' }] });
      }

      //new instance of teacher
      teacher = new User({
        name,
        email,
        password,
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10);
      teacher.password = await bcrypt.hash(password, salt);
      await teacher.save();
      await User.findByIdAndUpdate(teacher._id, {
        $push: { role: dbrole._id },
      });
      const payload = {
        teacher: {
          id: teacher.id,
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
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error!');
    }
  }
);

//@route    GET users
//@desc     Get all tutors
//@access   public
router.get('/', async (req, res) => {
  try {
    const role = await Role.findOne({ name: 'Teacher' });

    const users = await User.find({ role: role.id });

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

//@route    POST teachers/approve/:id
//@desc     Approve a teacher
//@access   Private
router.post('/approve/:id', auth, async (req, res) => {
  try {
    const teachers = await User.findById(req.params.id);

    const appointment = await Appointment.findById(req.params.id);
    await Appointment.updateOne(
      { _id: req.params.id },
      { $set: { approved: true } }
    );

    //check if the teacher has already been approved
    // if (teachers.approved === true) {
    //   return res.status(400).json({ msg: 'Teacher already approved' });
    // }

    // //check if the person is a teacher
    // const userT = await User.findOne({ _id: req.user.id });
    // const roles = await Role.findOne({ _id: userT.role });
    // if (userT.role === null || roles.name != 'Admin') {
    //   return res.status(401).json({ msg: 'Authorization denied' });
    // }

    // //update of approved teacher
    // await User.updateOne({ _id: teachers.id }, { $set: { approved: 'true' } });

    // await teachers.save();

    // res.json(teachers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
