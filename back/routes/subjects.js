const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { check, validationResult } = require('express-validator');

const Subject = require('../models/Subject');
const User = require('../models/User');
const Role = require('../models/Role');

const Category = require('../models/Category');
//@route    GET subjects
//@desc     Get all subjects
//@access   public
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const categoryObject = await Category.findOne({
      title: category,
    });
    let subjects = null;
    if (categoryObject) {
      subjects = await Subject.find({
        category: categoryObject._id,
      })
        .populate('category')
        .populate('createdby');
    } else {
      subjects = await Subject.find()
        .populate('category')
        .populate('createdby');
    }

    res.json(subjects);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

//@route    GET subjects/my
//@desc     Get my subjects
//@access   public
router.get('/my', auth, async (req, res) => {
  try {
    const userT = await User.findOne({ _id: req.user.id });
    const subjects = await Subject.find({ createdby: userT._id }).populate(
      'category'
    );
    //check if subject exist
    if (!subjects) {
      return res.status(404).json({ msg: 'Subject does not exist' });
    }

    res.json(subjects);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

//@route    GET subjects/id
//@desc     Get subjects by id
//@access   public
router.get('/:id', async (req, res) => {
  try {
    const subjects = await Subject.findById(req.params.id);
    //check if subject exist
    if (!subjects) {
      return res.status(404).json({ msg: 'Subject does not exist' });
    }

    res.json(subjects);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

//@route    POST subject
//@desc     Create new subject
//@access   private
router.post(
  '/',

  [
    auth,
    [
      check('title', 'Title of subject is required').not().isEmpty(),
      check('description', 'Price per hour of subject is required')
        .not()
        .isEmpty(),
      check('priceperhour', 'Price per hour of subject is required')
        .not()
        .isEmpty(),
      check('timelimit', 'Time limit per appointment is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userT = await User.findOne({ _id: req.user.id });
      const roles = await Role.findOne({ _id: userT.role });
      const category = await Category.findOne({ title: req.body.category });

      if (userT.role == null && roles.name != 'Teacher') {
        return res
          .status(401)
          .json({ msg: 'You are not a teacher, authorization denied' });
      }
      const { title, description, priceperhour, timelimit } = req.body;

      const subjectsFields = {};
      if (description) subjectsFields.description = description;
      if (title) subjectsFields.title = title;
      if (priceperhour) subjectsFields.priceperhour = priceperhour;
      if (timelimit) subjectsFields.timelimit = timelimit;

      const subjects = new Subject(subjectsFields);
      await subjects.save();

      await Subject.findByIdAndUpdate(subjects._id, {
        $push: { createdby: req.user.id, category: category.id },
      });

      await User.findByIdAndUpdate(req.user.id, {
        $push: { subject: subjects._id },
      });

      res.json(subjects);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server Error' });
    }
  }
);

//@route    DELETE subjects/:id
//@desc     Delete subject by id
//@access   private
router.delete('/:id', auth, async (req, res) => {
  try {
    const subjects = await Subject.findById(req.params.id);

    if (!subjects) {
      return res.status(404).json({ msg: 'Subject does not exist' });
    }
    const userT = await User.findOne({ _id: req.user.id });
    const roles = await Role.findOne({ _id: userT.role });

    if (
      userT.role == null &&
      roles.name != 'Teacher' &&
      subjects.createdby != userT._id
    ) {
      return res.status(401).json({ msg: 'Authorization denied' });
    }
    await subjects.remove();

    res.status(200).json({ msg: 'Subject removed' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

//@route    DELETE subjects/:idadmin
//@desc     Delete subject by id by Admin (ADMIN CRUD)
//@access   private
router.delete('/:idadmin', auth, async (req, res) => {
  try {
    const subjects = await Subject.findById(req.params.id);

    if (!subjects) {
      return res.status(404).json({ msg: 'Subject does not exist' });
    }

    const userT = await User.findOne({ _id: req.user.id });
    const roles = await Role.findOne({ _id: userT.role });

    if (userT.role === null || roles.name != 'Admin') {
      return res.status(401).json({ msg: 'Authorization denied' });
    }
    await subjects.remove();

    res.status(200).json({ msg: 'Subject removed' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

//@route    DELETE subjects
//@desc     Delete all subject
//@access   private
router.delete('/', auth, async (req, res) => {
  try {
    const userT = await User.findOne({ _id: req.user.id });
    const roles = await Role.findOne({ _id: userT.role });

    if (userT.role == null && roles.name != 'Admin') {
      return res.status(401).json({ msg: 'Authorization denied' });
    }
    await Subject.deleteMany();
    return res.status(200).json({ msg: 'success' });
  } catch (err) {
    console.error(err.message);
  }
});

//@route    POST subjects/review/:id
//@desc     Review on a subject
//@access   Private
router.post(
  '/review/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const subjects = await Subjects.findById(req.params.id);

      const newReview = {
        text: req.body.text,
        name: user.name,
        user: req.user.id,
      };

      subjects.reviews.unshift(newReview);

      await subjects.save();

      res.json(subjects.reviews);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    DELETE subjects/review/:id/:review_id
//@desc     Delete review on a subject
//@access   Private
router.delete('/review/:id/:review_id', auth, async (req, res) => {
  try {
    const subjects = await Subjects.findById(req.params.id);

    //Take review from a subject
    const review = subjects.reviews.find(
      (review) => review.id === req.params.review_id
    );

    if (!review) {
      return res.status(404).json({ msg: 'Review does not exist' });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    //Get remove index
    const removeIndex = subjects.reviews
      .map((review) => review.user.toString())
      .indexOf(req.user.id);

    subjects.reviews.splice(removeIndex, 1);

    await subjects.save();

    res.json(subjects.reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    PATCH subjects/notavailable/:id
//@desc     Set subject as not available
//@access   Private
router.patch('/notavailable/:id', auth, async (req, res) => {
  try {
    const subjects = await Subject.findById(req.params.id);

    //check if the person is a teacher
    const userT = await User.findOne({ _id: req.user.id });
    const roles = await Role.findOne({ _id: userT.role });
    if (userT.role === null || roles.name != 'Teacher') {
      return res.status(401).json({ msg: 'Authorization denied' });
    }

    //update of availabilty on subject
    await Subject.updateOne(
      { _id: subjects.id },
      { $set: { available: 'false' } }
    );

    await subjects.save();

    res.json(subjects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    PATCH subjects/available/:id
//@desc     Set subject as available
//@access   Private
router.patch('/available/:id', auth, async (req, res) => {
  try {
    const subjects = await Subject.findById(req.params.id);

    //check if the person is a teacher
    const userT = await User.findOne({ _id: req.user.id });
    const roles = await Role.findOne({ _id: userT.role });
    if (userT.role === null || roles.name != 'Teacher') {
      return res.status(401).json({ msg: 'Authorization denied' });
    }

    //update of availabilty on subject
    await Subject.updateOne(
      { _id: subjects.id },
      { $set: { available: 'true' } }
    );

    await subjects.save();

    res.json(subjects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
