const { Parser } = require("json2csv");
const Student = require("../models/student");
const Interview = require("../models/interview");
const Result = require("../models/result");
module.exports.home = function (req, res) {
  console.log(req.cookies);
  return res.render("home", {
    title: "Home",
  });
};
//for downloading csv file of data
module.exports.download = async function (req, res) {
  const fields = [
    {
      label: "First Name",
      value: "StudentId.name",
    },
    {
      label: "College Name",
      value: "StudentId.college",
    },
    {
      label: "Email Address",
      value: "StudentId.email",
    },
    {
      label: "DSA Score",
      value: "StudentId.DSAFinal_score",
    },
    {
      label: "React Score",
      value: "StudentId.ReactFinal_score",
    },
    {
      label: "WebD Score",
      value: "StudentId.WebDFinal_score",
    },
    {
      label: "DSA Score",
      value: "StudentId.DSAFinal_score",
    },
    {
      label: "Company",
      value: "companyId.company",
    },
    {
      label: "Date",
      value: "companyId.date",
    },
    {
      label: "Result",
      value: "result",
    },
  ];
  const opts = { fields };
  const json2csvParser = new Parser(opts);

  const data = await Result.find({})
    .populate("StudentId")
    .populate("companyId");
  const csv = json2csvParser.parse(data);
  res.header("Content-Type", "text/csv");
  res.attachment("doc.csv");
  return res.send(csv);
  return;
};
