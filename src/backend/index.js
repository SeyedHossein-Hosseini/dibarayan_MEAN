const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();

const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");

dotenv.config({ path: "./config/.env" });

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.get("/", (req, res) => {
  res.send("Hello world !!!");
});

app.get("/test", (req, res) => {
  res.send("This is test !!!");
});

app.use(authRoutes);
app.use(videoRoutes);

const dbURI = process.env.MONGODB_CONNECTION_STRING;

mongoose.set("strictQuery", false);
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to mongoDB ...");
    app.listen(process.env.PORT, process.env.HOST, () => {
      console.log(
        `Express server is running on http://${process.env.HOST}:${process.env.PORT}`
      );
    });
  })
  .catch((err) => console.log(err));
