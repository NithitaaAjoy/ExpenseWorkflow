const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";

let db;

async function connectDB() {
  const client = await MongoClient.connect(url);
  db = client.db("expenseworkflow"); // FIXED NAME
  console.log("MongoDB Connected");
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };