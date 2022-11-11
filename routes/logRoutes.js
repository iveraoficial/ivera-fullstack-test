const express = require("express");
const logController = require("../controllers/logController");
const userController = require("../controllers/userController");

const router = express.Router();

router.use(userController.protect, userController.restrictTo("admin"));

router.get("/logs", logController.getAll);

module.exports = router;
