const express = require("express");
const characterController = require("../controllers/characterController");

const router = express.Router();

router.get("/characters", characterController.list);
router.get("/characters/:id", characterController.details);

module.exports = router;
