const mongoose = require("mongoose");

const mongodbUrl =
  "mongodb+srv://srivanant21:QHsZ33lJPtAB5KgP@cluster0.8bqlttf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDb = () => {
  return mongoose.connect(mongodbUrl);
};

module.exports = { connectDb };
