const mongoose = require("mongoose");
require("dotenv").config(); // Load .env

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully!"))
.catch((err) => console.error("MongoDB connection error:", err));

// Optional: confirm connection
mongoose.connection.once("open", () => {
  console.log("MongoDB connection open, ready to use models!");
});

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
