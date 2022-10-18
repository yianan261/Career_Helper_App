const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const tasks = require("./routes/tasks");
const register = require("./routes/register");
const { MongoClient } = require("mongodb");
const path = require("path");

dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static("./public"));

app.use("/tasks", tasks);
app.use("/register", register);

app.get("/", (req, res, send) => {
  res.status(200).sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/register", (req, res, send) => {
  res.status(200).sendFile(path.join(__dirname, "views", "register.html"));
});

app.get("/sign-in", (req, res, send) => {
  res.status(200).sendFile(path.join(__dirname, "views", "sign-in.html"));
});

app.get("/profile", (req, res, send) => {
  res.status(200).sendFile(path.join(__dirname, "views", "profile.html"));
});

//redirects to index.html
app.get("/home", (req, res) => {
  res.status(200).redirect("/");
});

//if not found
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//connecting mongoDB
const client = new MongoClient(process.env.MONGO_URI);
const run = async () => {
  try {
    await client.connect();
    console.log("connected success");
  } finally {
    await client.close();
  }
};

run().catch(console.dir);
