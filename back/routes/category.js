const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

//@route    GET category
//@desc     Get all category
//@access   public
router.get('/', async (req, res) => {
  try {
    const category = await Category.find();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

//@route    POST category
//@desc     Create new category
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

      if (userT.role == null && roles.name != 'Admin') {
        return res
          .status(401)
          .json({ msg: 'You are not an admin, authorization denied' });
      }
      const { title, description } = req.body;

      const categoryFields = {};
      if (description) categoryFields.description = description;
      if (title) categoryFields.title = title;

      const category = new Category(categoryFields);
      await category.save();

      res.json(category);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server Error' });
    }
  }
);

//@route    DELETE category/:id
//@desc     Delete category by id
//@access   private
router.delete('/:id', auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: 'Category does not exist' });
    }

    await category.remove();

    res.status(200).json({ msg: 'Category removed' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});
module.exports = router;
