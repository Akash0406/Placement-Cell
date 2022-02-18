const mongoose = require("mongoose");
//schema for student
const studentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    college: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    DSAFinal_score: {
      type: Number,
      required: true,
    },
    WebDFinal_score: {
      type: Number,
      required: true,
    },
    ReactFinal_score: {
      type: Number,
      required: true,
    },
    Batch: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
