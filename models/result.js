const mongoose = require("mongoose");
//schema for result
const resultSchema = new mongoose.Schema(
  {
    StudentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
    },
    result: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
