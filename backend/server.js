const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb://127.0.0.1:27017/timetracker";

mongoose.connect(MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err.message);
});

app.use("/api/activity", require("./routes/activity"));

app.get("/", (req, res) => {
  res.send("Time Tracker Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
