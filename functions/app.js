const express = require("express");
const cors = require("cors");
const { connectDb } = require("../src/config/db");
const PORT = 5454;
const authRouters = require("../src/routes/auth.route.js");
const userRouters = require("../src/routes/user.route.js");
const preferenceRouters = require("../src/routes/preference.route.js");

const app = express();

app.use(express.json()); //middleware
app.use(cors()); // to allow all URLs from frontend

app.listen(PORT, async () => {
  await connectDb();
  console.log("Backend is listening on PORT : ", PORT);
});

app.get("/", (req, res) => {
  return res.status(200).send({ message: "Welcome- Backend is listening on PORT : ", PORT, status: true });
});

app.use("/auth", authRouters); // redirect all /auth to authRouters
app.use("/user", userRouters); // redirect all /user to userRouters
app.use("/preference",preferenceRouters); // redirect all /preference to preferenceRouters

module.exports = app;
