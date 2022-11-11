const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/login", userController.login);

router.post("/user", userController.createUser);

module.exports = router;
