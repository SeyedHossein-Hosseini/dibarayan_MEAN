const Video = require("../models/Video"); // Import the user model
const fs = require("fs");
const path = require("path");

module.exports.uploadVideo = async (req, res) => {
  let { title, userId, video, videoId, videoTime } = req.body;

  console.log({ title, userId, videoId, videoTime });

  const folderPath = path.join(__dirname, "..", "uploads", `${userId}`); // Replace ‘folderName’ with your desired folder name

  console.log(fs.existsSync(folderPath));

  if (!fs.existsSync(folderPath)) {
    console.log("folder path created");
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // Save the JSON string to a file within the created folder
  const filePath = path.join(folderPath, `${videoId}.json`);
  fs.writeFileSync(filePath, video);

  let video_ = await Video.create({ title, userId, videoId, videoTime });

  console.log({ video_ });

  res.json({ res: "Video Uploaded successfully" });
};

module.exports.getSpecificVideo = async (req, res) => {
  console.log("..........................................");
  const { title, userId } = req.body;

  let requestedVideo = await Video.findOne({ title, userId });

  let videoID = requestedVideo.videoId;

  let specifiedVideoPath = path.join(
    __dirname,
    "..",
    "uploads",
    `${userId}`,
    `${videoID}.json`
  );

  let videoBase64 = fs.readFileSync(specifiedVideoPath, "utf-8");

  console.log({ requestedVideo });

  res.json({ res: videoBase64 });
};

module.exports.getAllVideos = async (req, res) => {
  const { userId } = req.body;
  let allVideos = await Video.find({ userId });
  let allVideos_ = [];
  for (let i = 0; i < allVideos.length; i++) {
    let { title, userId, videoId, videoTime } = allVideos[i];

    let specifiedVideoPath = path.join(
      __dirname,
      "..",
      "uploads",
      `${userId}`,
      `${videoId}.json`
    );
    let videoBase64 = fs.readFileSync(specifiedVideoPath, "utf-8");
    allVideos_.push({ title, userId, videoId, videoTime, videoBase64 });
  }
  res.json({ res: allVideos_ });
  return;
};
