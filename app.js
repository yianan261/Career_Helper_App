const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const tasks = require("./routes/tasks");
const errorController = require("./controllers/error");
const { mongoConnect } = require("./config/db");
const register = require("./routes/register");
const signIn = require("./routes/sign-in");
const profile = require("./routes/profile");
const jobs = require("./routes/jobs");
const tracker = require("./routes/tracker");
const path = require("path");

dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.json())

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules/d3-dsv")));
// app.use(express.static("./public"));

app.use("/tasks", tasks);
app.use("/register", register);
app.use("/sign-in", signIn);
app.use("/profile", profile);
app.use("/tracker", tracker);
app.use("/jobs", jobs);

app.get("/", (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, "views", "index.html"));
});

//redirects to index.html
app.get("/home", (req, res) => {
  res.status(200).redirect("/");
});

//if not found
app.use(errorController.get404);

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

mongoConnect(() => {
  console.log("client");
});

// //connecting mongoDB
// const client = new MongoClient(process.env.MONGO_URI);
// const run = async () => {
//   try {
//     await client.connect();
//     console.log("connected success");
//   } finally {
//     await client.close();
//   }
// };

// run().catch(console.dir);
