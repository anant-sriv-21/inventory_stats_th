const mongoose = require("mongoose");
const Preference = require("../models/preference.js");
const User = require("../models/user.js");
const ColorThemes = require("../config/colorThemes.js");

const populatePreferences = async () => {
  try {
    // Check if the preferences already exist
    const existingPreferences = await Preference.find({});
    if (existingPreferences.length > 0)
      return false;

    // Insert each color theme as a preference
    const preferencePromises = Object.values(ColorThemes).map((theme) => {
      return new Preference({ colorTheme: theme }).save();
    });

    await Promise.all(preferencePromises);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUserPreference = async (req, res)=> {
  try {
    const {id} = req.query
    const {preference} = req.body;
    if (!Object.values(ColorThemes).includes(preference)) {
      return res.status(400).send('Invalid color theme');
    }
    const user = await User.findById(id).populate("preference");
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Find or create the preference
    const fetchedPreference = await Preference.findOne({ colorTheme: preference });
    // if (!preference) {
    //   preference = new Preference({ colorTheme });
    //   await preference.save();
    // }

    // Update the user's preference
    user.preference = fetchedPreference?._id;
    await user.save();

    return res.status(200).send({ message: 'User preference updated successfully', user })
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { populatePreferences,updateUserPreference };
