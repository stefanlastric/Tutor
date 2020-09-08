const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    subjects: [
      {
        subject: {
          type: Schema.Types.ObjectId,
          ref: 'subjects',
        },
        name: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = Category = mongoose.model('category', CategorySchema);
