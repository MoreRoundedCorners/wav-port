// s3Routes.js
const express = require("express");
const songRouter = express.Router();
const { getSongsData } = require("../s3/s3Fetch");

songRouter.get("/songs", async (req, res) => {
  const songsData = await getSongsData();
  res.json(songsData);
});

module.exports = songRouter;
