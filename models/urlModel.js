// urlModel.js
const mongoose = require("mongoose");
require("dotenv").config(); // .env se URI read karne ke liye

// MongoDB Atlas se connect
mongoose.connect(process.env.MONGODB_URL);

// URL Schema
const urlSchema = mongoose.Schema({
  longurl: {
    type: String,
    required: true,
  },
  shorturl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("urlModel", urlSchema);
