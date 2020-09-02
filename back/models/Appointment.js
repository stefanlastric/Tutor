const mongoose = require('mongoose');
const AppointmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    timelimit: {
      type: String,
      required: true,
    },
    datecreated: {
      type: Date,
      default: Date.now,
    },
    approved: {
      type: Boolean,
      //0 not 1 yes
      default: false,
    },
    canceled: {
      type: Boolean,
      default: false,
    },
    users: {
      for: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      acceptedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },

      canceledby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null,
      },
    },
  },
  { timestamps: true }
);

module.exports = Appointment = mongoose.model(
  'appointments',
  AppointmentSchema
);
