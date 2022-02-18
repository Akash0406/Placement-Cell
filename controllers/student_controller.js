const Student = require("../models/student");
//function to show list of students
module.exports.list = function (req, res) {
  Student.find({}, function (err, list) {
    if (err) {
      console.log("Error while getting request");
      return;
    }
    //render home.ejs file
    return res.render("student", {
      title: "Student List",
      student: list,
    });
  });
};
//function to create student
module.exports.create = function (req, res) {
  Student.findOne({ email: req.body.email }, function (err, student) {
    if (err) {
      console.log("error while creating student");
      return;
    }

    if (!student) {
      Student.create(req.body, function (err, student) {
        if (err) {
          console.log("error in creating student");
          return;
        }

        return res.redirect("/student");
      });
    } else {
      return res.redirect("back");
    }
  });
};
