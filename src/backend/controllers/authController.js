const User = require("../models/User"); // Import the user model
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res) => {
  console.log("POST request from frontend");
  const { username, password } = req.body;
  try {
    var l_user = await User.findOne({ username });
    if (!l_user)
      return res.json({
        res: "Invalid username or password",
        status: false,
      });

    const isMatch = await bcrypt.compare(password, l_user.password);
    if (!isMatch)
      return res.json({
        res: "Invalid username or password",
        status: false,
      });

    // Generate a JWT token
    const token = jwt.sign({ userId: l_user.id_ }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });
    console.log("s_user.id_: ", l_user.id_);
    res.json({ res: token, status: true, userId: l_user.username });
  } catch (error) {
    console.error(error);
    res.json({ res: "Server error", status: false });
  }
};

module.exports.signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await User.findOne({ username });
    console.log({ userExists });
    if (!userExists) {
      var s_user = await User.create({ username, password });
      console.log({ s_user });
      const token = jwt.sign({ userId: s_user.id_ }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      });
      console.log("s_user.id_: ", s_user.username);
      res.json({ res: token, status: true, userId: s_user.username });
    } else {
      console.log("equals");
      res.json({ res: "Duplicated User", status: false });
    }
  } catch (error) {
    console.error(error);
    res.json({ res: "Server error", status: false });
  }
};
