const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const songRouter = require("./routes/s3Routes");
const path = require("path");

// Load environment variables from .env file
dotenv.config();

// Create express app
const app = express();

// Enable CORS
app.use(cors());

// Parse JSON request body
app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api", songRouter);

app.use(express.static(path.join(__dirname, "../build")));

// Fallback handler should be the last route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
