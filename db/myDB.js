const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

//Yian Chen
/**
 * MyMongoDB module funciton has authenticate, get, and create functionalities for the DB
 * @returns myDB object contianing the functions
 */
function MyMongoDB() {
  const myDB = {};
  const url = process.env.MONGO_URI || "mongodb://localhost:27017";
  const DB_NAME = "careerHelperMembers";
  const USER_COLLECTION = "user";
  const TRACKER_COLLECTION = "tracker";

  //function that authenticates users
  myDB.authenticate = async (user) => {
    let client;
    try {
      client = new MongoClient(url);
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      console.log("searching for", user);
      const res = await usersCol.findOne({ email: user.email });
      console.log("res", res, res.password === user.password);
      if (res.password === user.password) return true;
      return false;
    } finally {
      console.log("closing the connection");
      client.close();
    }
  };
  //function that creates users
  myDB.createUser = async (user) => {
    let client;
    try {
      client = new MongoClient(url);
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      console.log("Collection read, insert ", user);
      const res = await usersCol.insertOne(user);
      console.log("Inserted!", res);
      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };
  //function that gets user info by email
  myDB.getUser = async (_email) => {
    let client;
    try {
      client = new MongoClient(url);
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      console.log(`getting user with email ID of ${_email}`);
      const res = await usersCol.findOne({ email: _email });
      console.log("Got user", res);
      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };
  //function that creates user profile by email
  myDB.createProfile = async (_email, _profile) => {
    let client;
    try {
      client = new MongoClient(url);
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      console.log(`getting user with email ID of ${_email}`);
      const res = await usersCol.findOneAndUpdate(
        { email: _email },
        { $set: { profile: _profile } }
      );
      console.log("Got user", res);
      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  //Amanda to do: create update profile function when user updates profile

  // Amanda Au-Yeung
  // function to get tracker
  myDB.createTracker = async (tracker) => {
    let client;
    try {
      client = new MongoClient(url);
      const db = client.db(DB_NAME);
      const trackerCol = db.collection(TRACKER_COLLECTION);
      const res = await trackerCol.insertOne(tracker);
      console.log("Inserted!", res);
      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  // Amanda Au-Yeung
  //function that gets tracker info by companies
  myDB.getAllTracker = async (companies) => {
    let client;
    try {
      client = new MongoClient(url);
      const db = client.db(DB_NAME);
      const trackerCol = db.collection(TRACKER_COLLECTION);
      console.log(`getting user with companies of ${companies}`);
      const res = await trackerCol.findOne({ company: companies });
      console.log("Got companies", res);
      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  return myDB;
}

module.exports = MyMongoDB();
