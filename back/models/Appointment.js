const mongoose = require('mongoose');
const AppointmentSchema = new mongoose.Schema(
  {
    timelimit: {
      type: String,
      default: '2h',
    },
    datecreated: {
      type: Date,
      default: Date.now,
    },
    requestedDate: {
      type: Date,
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
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'subject',
    },

    createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
);

module.exports = Appointment = mongoose.model(
  'appointments',
  AppointmentSchema
);
