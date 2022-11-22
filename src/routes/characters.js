const express = require('express');
const marvelController = require('./controllers/marvel.js');
const router = express.Router();

router.get('/characters', marvelController.getMarvelData);
router.get('/characters-detail', marvelController.getCharacterDetails);

module.exports = router;