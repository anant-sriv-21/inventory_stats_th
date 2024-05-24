const mongoose = require("mongoose");
const ColorThemes = require("../config/colorThemes.js");

const preferenceSchema = new mongoose.Schema({
    colorTheme: {
        type: String,
        enum: Object.values(ColorThemes),
        required: true,
        unique: true
    }
})
Object.assign(preferenceSchema.statics, { ColorThemes }); // to make static, access the ColorThemes enum directly from the model 

const Preference = mongoose.model("preference",preferenceSchema);

module.exports = Preference;