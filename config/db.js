const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const mongoConnect = () => {
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
};

module.exports = mongoConnect;
