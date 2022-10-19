const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

let _db;

const mongoConnect = () => {
  //connecting mongoDB
  const client = new MongoClient(process.env.MONGO_URI);
  const run = async () => {
    try {
      await client.connect();
      console.log("connected to MongoDB successfully");
      _db = client.db();
    } catch (err) {
      console.error(err);
      throw new Error(`Something Failed`);
    } finally {
      await client.close();
    }
  };

  run().catch(console.dir);
};

const getDB = () => {
  if (_db) {
    return _db;
  } else {
    throw `No database found!`;
  }
};

module.exports = { mongoConnect, getDB };
