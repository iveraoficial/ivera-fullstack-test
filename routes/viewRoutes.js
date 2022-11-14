const express = require("express");
const viewsController = require("../controllers/viewsController");

const router = express.Router();

router.get("/login", viewsController.getLogin);

router.get("/", viewsController.getCharacters);
router.get("/:id", viewsController.getCharacterDetails);

module.exports = router;
