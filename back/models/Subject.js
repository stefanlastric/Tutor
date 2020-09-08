const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priceperhour: {
      type: String,
      trim: true,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    timelimit: {
      type: String,
      default: '2 hours',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    review: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
      },
      name: {
        type: String,
      },
    },
    createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    category: [
      {
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'category',
        },
        name: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = Subject = mongoose.model('subject', SubjectSchema);
