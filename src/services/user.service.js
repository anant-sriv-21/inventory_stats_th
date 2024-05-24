const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider.js");
const Preference = require("../models/preference");

const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;

    const isExistingUser = await User.findOne({ email });
    if (isExistingUser)
      throw new Error("User already exist with email: ", email);

    password = await bcrypt.hash(password, 8);
    const defaultPreference = await Preference.findOne({
      colorTheme: "default",
    });
    const role = "User";
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      preference: defaultPreference._id,
      role,
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).populate("preference");
    if (!user) throw new Error("User not found by userId: ", userId);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found by email ", email);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProfileByToken = async (token) => {
  try {
    const userId = jwtProvider.getUserIdFromToken(token);
    const user = await getUserById(userId);
    if (!user) throw new Error("User not found by userId: ", userId);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserProfileByToken,
  getUserById,
  getAllUsers,
};
