const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json())
const connection = mongoose.connect(process.env.MONGODB_URL);

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model("user", userSchema);

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.get("/users", async (req, res) => {
  const users = await UserModel.find();
  res.send(users);
});

app.post("/users/add", async (req, res) => {
  const user = await UserModel(req.body);
  await user.save();
  res.send("User saved");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server running on ${PORT}`);
});
