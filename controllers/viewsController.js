const User = require("../models/userModel");
const characterController = require("../controllers/characterController");

exports.getLogin = async (req, res) => {
  const users = await User.find();

  res.status(200).render("login", {
    title: "Login",
    users,
  });
};

exports.getCharacterDetails = (req, res) => {
  res.status(200).render("character", {
    title: "Character",
  });
};

exports.getCharacters = async (req, res) => {
  const characters = await characterController.listData(req, res);

  // console.log(characters.data.results);
  // console.log(characters.data.results[0].name);
  // console.log(characters.data.results[3].thumbnail.path);
  // console.log(characters.data.results.length);

  // console.log(
  //   characters.data.results[3].thumbnail.path.split("/").pop() ===
  //     "image_not_available"
  // );

  res.status(200).render("characters", {
    title: "Characters",
    characters,
  });
};
