const Interview = require("../models/interview");
const Student = require("../models/student");
const Result = require("../models/result");
//function to show list of companies
module.exports.list = async function (req, res) {
  try {
    let students = await Student.find({});
    let interviews = await Interview.find({});

    return res.render("interview", {
      title: "Interview",
      interviews: interviews,
      students: students,
    });
  } catch (err) {
    console.log("err", err);
    return;
  }
};
//function to create interview
module.exports.create = function (req, res) {
  Interview.findOne({ company: req.body.company }, function (err, interview) {
    if (err) {
      console.log("error while creating student");
      return;
    }

    if (!interview) {
      Interview.create(req.body, function (err, interview) {
        if (err) {
          console.log("error in creating interview");
          return;
        }
        console.log(interview);
        return res.redirect("/interview");
      });
    } else {
      return res.redirect("back");
    }
  });
};


module.exports.allocate = function (req, res) {
  let student_id = req.query.s;
  let interview_id = req.query.i;
  Result.create({
    StudentId: student_id,
    companyId: interview_id,
    result: "Not-Attempted",
  });
  Interview.findOne({ _id: interview_id }, function (err, interview) {
    if (err) {
      console.log(err);
      return;
    }
    Student.findOne({ _id: student_id }, function (err, student) {
      console.log(student);
      console.log(interview);
      interview.students.push(student);
      interview.save();
    });
  });

  return res.redirect("back");
};
//function to update result
module.exports.result = async function (req, res) {
  console.log(req.query);
  let student_email = req.query.s;
  let interview_name = req.query.i;
  let value = req.query.value;
  const student = await Student.findOne({ email: student_email });
  const interview = await Interview.findOne({ company: interview_name });
  let resultId = await Result.findOne({
    $and: [{ StudentId: student._id }, { companyId: interview._id }],
  });
  await Result.findByIdAndUpdate(resultId, {
    result: value,
  });
  Result.find({ companyId: interview._id })
    .populate("StudentId")
    .populate("companyId")
    .then((p) => {
      console.log(p);
      return res.render("allocatedStudents", {
        title: "Allocated Students",
        interview: p,
      });
    });
};
// function to show list of allocated students for particular company
module.exports.allocatedStudents = function (req, res) {
  let interview_id = req.query.i;
  console.log(interview_id);
  // Result.find({companyId: interview_id}).then(p=>console.log(p));
  // Result.find({companyId: interview_id}).populate('StudentId').then(p=>console.log(p));
  Result.find({ companyId: interview_id })
    .populate("StudentId")
    .populate("companyId")
    .then((p) => {
      console.log(p);
      return res.render("allocatedStudents", {
        title: "Allocated Students",
        interview: p,
      });
    });
  return;
};
