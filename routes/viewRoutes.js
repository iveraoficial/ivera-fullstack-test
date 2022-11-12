const express = require("express");
const viewsController = require("../controllers/viewsController");

const router = express.Router();

router.get("/", viewsController.getCharacters);

router.get("/login", viewsController.getLogin);

router.get("/character", viewsController.getCharacterDetails);

module.exports = router;
