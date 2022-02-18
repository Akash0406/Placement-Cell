const express = require("express");
const router = express.Router();
const passport = require("passport");
const studentController = require("../controllers/student_controller");
//routing to particular file according to routepath after checking authentication
router.get("/", passport.checkAuthentication, studentController.list);
router.post("/create", passport.checkAuthentication, studentController.create);

module.exports = router;
