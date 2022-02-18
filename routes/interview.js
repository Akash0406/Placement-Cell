const express = require("express");
const router = express.Router();
const passport = require("passport");
const interviewController = require("../controllers/interview_controller.js");
//routing to particular file according to routepath after checking authentication
router.get("/", passport.checkAuthentication, interviewController.list);
router.post("/create", passport.checkAuthentication, interviewController.create);
router.get("/allocate/", passport.checkAuthentication, interviewController.allocate);
router.get("/result/", passport.checkAuthentication, interviewController.result);
router.get("/allocatedStudents/", passport.checkAuthentication, interviewController.allocatedStudents);

module.exports = router;
