const { getDB } = require("../db/connection");

async function createUser(user) {

  const db = getDB();

  return db.collection("users").insertOne(user);

}

async function findUserByEmail(email) {

  const db = getDB();

  return db.collection("users").findOne({ email: email });

}

module.exports = { createUser, findUserByEmail };