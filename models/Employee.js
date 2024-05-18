const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
