const { getDB } = require("../db/connection");

async function createWorkflow(workflow) {
  const db = getDB();
  return db.collection("workflows").insertOne(workflow);
}

async function getWorkflows() {
  const db = getDB();
  return db.collection("workflows").find().toArray();
}

async function getWorkflowById(id) {
  const db = getDB();
  const { ObjectId } = require("mongodb");
  return db.collection("workflows").findOne({ _id: new ObjectId(id) });
}

module.exports = { createWorkflow, getWorkflows, getWorkflowById };