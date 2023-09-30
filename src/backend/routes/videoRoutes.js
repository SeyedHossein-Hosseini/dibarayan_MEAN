// authRoutes.js (Express.js Routes)
const express = require("express");
const router = express.Router();

const {
  uploadVideo,
  getSpecificVideo,
  getAllVideos,
} = require("../controllers/videoController");

router.post("/upload-video", uploadVideo);

router.post("/get-video", getSpecificVideo);

router.post("/get-videos", getAllVideos);

module.exports = router;
