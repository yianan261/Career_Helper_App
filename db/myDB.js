import { MongoClient } from "mongodb";
import dotenv from "dotenv";
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
  const JOB_COLLECTION = "jobs";
  const PAGE_SIZE = 18;

  //function that authenticates users
  myDB.authenticate = async (user) => {
    let client;
    try {
      client = new MongoClient(url);
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      const res = await usersCol.findOne({ email: user.email });
      if (res && res.password === user.password) return true;
      return false;
    } finally {
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
      const res = await usersCol.insertOne(user);
      return res;
    } finally {
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
      const options = {
        projection: { password: 0, "confirm-password": 0, confirm_password: 0 },
      };
      const res = await usersCol.findOne({ email: _email }, options);
      return res;
    } finally {
      client.close();
    }
  };

  //function that creates/updates user profile by email or updates when profile is changed
  myDB.updateProfile = async (_email, _profile) => {
    let client;
    try {
      client = new MongoClient(url);
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      const res = await usersCol.updateOne(
        { email: _email },
        { $set: { profile: _profile } }
      );
      return res;
    } finally {
      client.close();
    }
  };

  //function that gets user profile
  myDB.getUserProfile = async (_email) => {
    let client;
    try {
      client = new MongoClient(url);
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      const options = {
        projection: {
          profile: 1,
        },
      };
      const res = await usersCol.findOne({ email: _email }, options);
      console.log("Got user profile", res);
      return res;
    } finally {
      client.close();
    }
  };

  //function that gets the job posts
  myDB.getPosts = async function (query = {}, page = 0) {
    let client;
    try {
      client = new MongoClient(url);
      const postsCol = client.db(DB_NAME).collection(JOB_COLLECTION);
      return await postsCol
        .find(query)
        .skip(PAGE_SIZE * page)
        .limit(PAGE_SIZE)
        .toArray();
    } finally {
      client.close();
    }
  };

  //function that queries job posts users search for
  myDB.findJobPosts = async function (word) {
    let client;
    try {
      client = new MongoClient(url);
      const postsCol = client.db(DB_NAME).collection(JOB_COLLECTION);
      return await postsCol
        .find({
          $or: [
            { company_name: { $regex: word, $options: "i" } },
            { job_position: { $regex: word, $options: "i" } },
            { city: { $regex: word, $options: "i" } },
            { state: { $regex: word, $options: "i" } },
          ],
        })
        .limit(PAGE_SIZE)
        .toArray();
    } finally {
      client.close();
    }
  };

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

export default MyMongoDB();
