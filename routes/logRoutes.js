const express = require("express");
const logController = require("../controllers/logController");
const userController = require("../controllers/userController");

const router = express.Router();

router.get(
  "/logs",
  userController.protect,
  userController.restrictTo("admin"),
  logController.getAll
);

module.exports = router;
