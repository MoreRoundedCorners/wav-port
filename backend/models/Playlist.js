// create a new model called Playlist

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  songs: { type: Array, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
