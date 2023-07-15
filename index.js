const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

const connection = mongoose.connect(process.env.MONGODB_URL);

app.get("/", (req, res) => {
  res.send("Homepage");
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
