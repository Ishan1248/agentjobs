const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "config.env") });
const dbConnect = require(path.join(__dirname, "..", "config", "db"));
const Candidate = require(path.join(__dirname, "..", "model", "CandidateSchema"));
const Agent = require(path.join(__dirname, "..", "model", "AgentSchema"));
const Recruiter = require(path.join(__dirname, "..", "model", "RecruiterSchema"));

const deleteDb = async () => {
  try {
    dbConnect();
    console.log("DELETING ALL DATA FROM DB");
    await Candidate.deleteMany({});
    await Agent.deleteMany({});
    await Recruiter.deleteMany({});
    console.log("ALL DATA DELETED FROM DB");
    process.exit(0);
  } catch (err) {
    console.log("SOMETHING WENT WRONG WHILE DELETING DB DATA", err);
  }
};

deleteDb();
