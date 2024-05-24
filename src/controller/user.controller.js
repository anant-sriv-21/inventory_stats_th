const userService = require("../services/user.service");

const getUserProfile = async (req, res) => {
  try {
    const {id}= req.query;
    const user = await userService.getUserById(id);
    if (user) return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { getUserProfile };
