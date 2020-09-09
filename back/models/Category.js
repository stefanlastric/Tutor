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
          type: mongoose.Schema.Types.ObjectId,
          ref: 'subject',
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = Category = mongoose.model('category', CategorySchema);
