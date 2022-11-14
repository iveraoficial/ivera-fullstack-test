const User = require("../models/userModel");
const characterController = require("../controllers/characterController");

exports.getLogin = async (req, res) => {
  const users = await User.find();

  res.status(200).render("login", {
    title: "Login",
    users,
  });
};

exports.getCharacters = async (req, res) => {
  const characters = await characterController.listData(req, res);

  res.status(200).render("characters", {
    title: "Characters",
    characters,
  });
};

exports.getCharacterDetails = async (req, res) => {
  const character = await characterController.detailsData(req, res);

  res.status(200).render("characterDetails", {
    title: "Character",
    character,
  });
};
