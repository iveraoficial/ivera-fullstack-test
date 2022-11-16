const Character = require("../models/CharacterModel")

exports.paginaInicial = async (req, res) => {
  const character = [];
  const result = await Character.buscaChacaracters(0);
  const characters = result[0];
  const characters2 = result[1];
  req.session.logRequests = {
    requestMethod: 'get',
    url: 'http://localhost:3000/',
    parameters: [character, characters, characters2]
  }
  req.session.save()
  res.render('index', {characters, character, characters2});
  return;
};

exports.paginaInicialPage = async (req, res) => {
  const character = [];
  result = await Character.buscaChacaracters(req.body.page)
  const characters = result[0];
  const characters2 = result[1];
  req.session.logRequests = {
    requestMethod: 'post',
    url: 'http://localhost:3000/page',
    parameters: [character, characters, characters2]
  }
  req.session.save()
  res.render('index', {characters, character, characters2});
  return;
};
