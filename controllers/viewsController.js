const User = require("../models/userModel");

exports.getUser = async (req, res) => {
  const users = await User.find();

  res.status(200).render("home", {
    title: "Users",
    users,
  });
};
