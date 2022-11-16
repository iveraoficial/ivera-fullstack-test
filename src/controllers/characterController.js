const Character = require("../models/CharacterModel");

exports.trataSearch = async (req, res) =>{
    try{
      const characters = [];
      const characters2 = [];
      let character;
      if(req.body.name == ""){
        character = await Character.buscaCharacter("a");
      }
      else {
        character = await Character.buscaCharacter(req.body.name);
      }
      req.session.logRequests = {
        requestMethod: 'post',
        url: 'http://localhost:3000/search',
        parameters: [character, characters, characters2]
      }
      req.session.save()
      res.render('index', {character, characters, characters2})
      return;
    } catch(e){
      console.log(e);
      res.render('404');
    }
  };

  exports.details = async (req, res)=>{
    try{
      if(!req.params.id) return;
      const character = await Character.buscaCharacterId(req.params.id);
      req.session.logRequests = {
        requestMethod: 'get',
        url: `http://localhost:3000/${req.params.id}`,
        parameters: [character]
      }
      req.session.save()
      res.render('details', {character});
    } catch(e){
      console.log(e);
      res.render('404');
    }
  }