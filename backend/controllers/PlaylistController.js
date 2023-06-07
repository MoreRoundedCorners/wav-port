const Playlist = require("../models/Playlist");

exports.createPlaylist = async (req, res) => {
  try {
    const { title, description, songsToAdd } = req.body;
    const userId = req.user; // Assuming the user ID is available in the req.user property

    console.log("req.body from createPlaylist", req.body);

    // Create a new playlist
    const newPlaylist = new Playlist({
      title: req.body.title,
      description: req.body.description,
      songs: req.body.songs,
      user: req.user._id,
    });
    console.log("songs from createPlaylist", req.body.songs);

    // Save the playlist to the database
    const savedPlaylist = await newPlaylist.save();
    console.log("savedPlaylist", savedPlaylist);
    // Return the playlist
    res.status(201).json(savedPlaylist);
  } catch (error) {
    res.status(500).json({ error: "Error creating playlist" });
  }
};

exports.addSongToPlaylist = async (req, res) => {
  try {
    // Find the playlist with the given ID
    const playlist = await Playlist.findById(req.params.id);

    // Add the song to the playlist
    playlist.songs.push(req.body.song);

    console.log("req body from addSongToPlaylist: ", req.body);
    console.log("req.body.song from addSongToPlaylist", req.body.song);

    // Save the playlist
    const savedPlaylist = await playlist.save();

    // Get the added song
    const addedSong = savedPlaylist.songs[savedPlaylist.songs.length - 1];

    // Return the added song
    res.json(addedSong);
  } catch (error) {
    res.status(500).json({ error: "Error adding song to playlist" });
  }
};

exports.getAllPlaylists = async (req, res) => {
  try {
    // Find all playlists that belong to the user
    const playlists = await Playlist.find({ user: req.user._id });

    // Return the playlists
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ error: "Error fetching playlists" });
  }
};

exports.getPlaylistById = async (req, res) => {
  try {
    // Find the playlist with the given ID
    const playlist = await Playlist.findById(req.params.id);

    // Return the playlist
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ error: "Error fetching playlist" });
  }
};

exports.updatePlaylist = async (req, res) => {
  try {
    // Find the playlist with the given ID
    const playlist = await Playlist.findById(req.params.id);

    // Update the playlist
    playlist.title = req.body.title;
    playlist.description = req.body.description;
    playlist.songs = req.body.songs;

    // Save the playlist
    const savedPlaylist = await playlist.save();

    // Return the updated playlist
    res.json(savedPlaylist);
  } catch (error) {
    res.status(500).json({ error: "Error updating playlist" });
  }
};

exports.deletePlaylist = async (req, res) => {
  try {
    // Find the playlist with the given ID
    const playlist = await Playlist.findById(req.params.id);
    console.log("playlist from deletePlaylist", playlist);

    // If the playlist does not exist, return an error
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    // Delete the playlist
    await Playlist.findByIdAndDelete(req.params.id);

    // Return a success message
    return res.json({ message: "Playlist deleted" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: `Error deleting playlist: ${error.message}` });
  }
};

exports.deleteSongFromPlaylist = async (req, res) => {
  try {
    // Find the playlist with the given ID
    const playlist = await Playlist.findById(req.params.id);

    // Delete the song from the playlist
    playlist.songs = playlist.songs.filter(
      (song) => song.key !== req.params.songId
    );

    // If no songs are left in the playlist, delete the playlist
    if (playlist.songs.length === 0) {
      await Playlist.findByIdAndDelete(req.params.id);
      return res.json({ message: "Playlist deleted as no songs were left." });
    }

    // Save the playlist
    const savedPlaylist = await playlist.save();

    // Return the updated playlist
    res.json(savedPlaylist);
  } catch (error) {
    res.status(500).json({ error: "Error deleting song from playlist" });
  }
};

exports.deleteAllPlaylists = async (req, res) => {
  try {
    // Delete all playlists that belong to the user
    await Playlist.deleteMany({ user: req.user._id });

    // Return a success message
    res.json({ message: "All playlists deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting playlists" });
  }
};

exports.deleteAllSongsFromPlaylist = async (req, res) => {
  try {
    // Find the playlist with the given ID
    const playlist = await Playlist.findById(req.params.id);

    // Delete all songs from the playlist
    playlist.songs = [];

    // Save the playlist
    const savedPlaylist = await playlist.save();

    // Return the updated playlist
    res.json(savedPlaylist);
  } catch (error) {
    res.status(500).json({ error: "Error deleting songs from playlist" });
  }
};

exports.getSongsFromPlaylist = async (req, res) => {
  try {
    // Find the playlist with the given ID
    const playlist = await Playlist.findById(req.params.id);

    // Return the songs from the playlist
    res.json(playlist.songs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching songs from playlist" });
  }
};

exports.getSongFromPlaylist = async (req, res) => {
  try {
    // Find the playlist with the given ID
    const playlist = await Playlist.findById(req.params.id);

    // Find the song with the given ID
    const song = playlist.songs.find((song) => song.id === req.params.songId);

    // Return the song
    res.json(song);
  } catch (error) {
    res.status(500).json({ error: "Error fetching song from playlist" });
  }
};

exports.updateSongInPlaylist = async (req, res) => {
  try {
    // Find the playlist with the given ID
    const playlist = await Playlist.findById(req.params.id);

    // Find the song with the given ID
    const song = playlist.songs.find((song) => song.id === req.params.songId);

    // Update the song
    song.title = req.body.title;
    song.artist = req.body.artist;
    song.album = req.body.album;
    song.albumCoverUrl = req.body.albumCoverUrl;
    song.audioUrl = req.body.audioUrl;

    // Save the playlist
    const savedPlaylist = await playlist.save();

    // Return the updated playlist
    res.json(savedPlaylist);
  } catch (error) {
    res.status(500).json({ error: "Error updating song in playlist" });
  }
};
