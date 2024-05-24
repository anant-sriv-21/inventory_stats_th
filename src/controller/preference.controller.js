const preferenceService = require("../services/preference.service.js");

const populateAllPreferences = async (req, res) => {
  try {
    const response = await preferenceService.populatePreferences();
    if (!response)
      return res.status(500).send({ message: "Preferences already populated" });

    return res.status(200).send({ message: "Preferences populated successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateUserPreference = async(req,res)=> {
  try {
    const response = await preferenceService.updateUserPreference(req, res);
    return res;
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}


module.exports = { populateAllPreferences, updateUserPreference };
