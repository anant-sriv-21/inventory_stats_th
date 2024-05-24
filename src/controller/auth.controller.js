const userService = require("../services/user.service.js");
const jwtProvider = require("../config/jwtProvider.js");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    return res.status(200).send({ id:user._id, message: "User registration successful" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!user)
      return res.status(404).send({ message: "User not found by : ", email });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).send({ message: "Invalid password" });

    const jwt = jwtProvider.generateToken(user._id);

    return res.status(200).send({id:user._id, jwt, message: "Login Successful" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { register, login };
