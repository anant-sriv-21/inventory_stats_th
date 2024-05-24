const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: "User"
    },
    preference: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"preference",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model("users",userSchema);

module.exports = User;