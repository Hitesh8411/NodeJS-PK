const mongoose = require("mongoose");

//Define  the MongoDB connection URL

const mongoURL =process.env.MONGO_URI_LOCAL;
// const mongoURL = process.env.MONGO_URI;

mongoose.connect(mongoURL, {});

// Get the default connection
// mongoose maintains a deafult connection object representing the mongoDB connection

const db = mongoose.connection;

//define event listeers for databse connection

db.on("connected", () => {
  console.log("connectred to mongoDB server");
});

db.on("error", (err) => {
  console.log("mongodb connection error", err);
});

db.on("disconnected", () => {
  console.log("mongodb connection disconnected");
});

//export the databse connection

module.exports = db;
