const express = require("express");
const router = express.Router();
const PlaylistController = require("../controllers/PlaylistController");
const { authMiddleware } = require("../controllers/UserController");
const { getSongsData } = require("../s3/s3Fetch");

router.get("/", authMiddleware, PlaylistController.getAllPlaylists);
router.get("/:id", authMiddleware, PlaylistController.getPlaylistById);
router.post("/", authMiddleware, PlaylistController.createPlaylist);
router.put("/:id", authMiddleware, PlaylistController.updatePlaylist);
router.delete("/:id", authMiddleware, PlaylistController.deletePlaylist);
router.post("/:id/songs", authMiddleware, PlaylistController.addSongToPlaylist);
router.delete(
  "/:id/songs/:songId",
  authMiddleware,
  PlaylistController.deleteSongFromPlaylist
);
router.get(
  "/:id/songs",
  authMiddleware,
  PlaylistController.getSongsFromPlaylist
);
router.get(
  "/:id/songs/:songId",
  authMiddleware,
  PlaylistController.getSongFromPlaylist
);
router.get(
  "/:id/songs/:songId",
  authMiddleware,
  PlaylistController.getSongFromPlaylist
);
router.put(
  "/:id/songs/:songId",
  authMiddleware,
  PlaylistController.updateSongInPlaylist
);

router.get("/api/songs", async (req, res) => {
  const songsData = await getSongsData();
  res.json(songsData);
});

module.exports = router;
