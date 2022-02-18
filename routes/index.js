const express = require("express");

const router = express.Router();
const homeController = require("../controllers/home_controller");

console.log("Router is Loaded");

router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/student", require("./student"));
router.use("/interview", require("./interview"));
router.get("/download", homeController.download);

module.exports = router;
