// Video.js (Mongoose Schema)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  title: { type: String, required: true },
  userId: { type: String, required: true },
  videoId: { type: String, required: true },
  videoTime: { type: String, required: true },
});

module.exports = mongoose.model("Video", videoSchema);
