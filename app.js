import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import register from "./routes/register.js";
import jobs from "./routes/jobs.js";
import profile from "./routes/profile.js";
import signIn from "./routes/sign-in.js";
import tracker from "./routes/tracker.js";
import session from "express-session";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Yian Chen
dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  session({
    secret: "key that will sign cookie",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("./public"));

app.use("/register", register);
app.use("/jobs", jobs);
app.use("/profile", profile);
app.use("/sign-in", signIn);
app.use("/tracker", tracker);

//if not found
app.get("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
});

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

