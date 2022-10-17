const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const tasks = require("./routes/tasks");
const { MongoClient } = require("mongodb");

dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// app.use("/sign-up",(req,res,next)=>{
//     res.send()
// })

app.use(express.static("./public"));

app.use("/tasks", tasks);

// app.get("/sign-up.html", (req, res) => {
//   res.send()
// });

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
