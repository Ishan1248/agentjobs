const path = require("path");
const Candidate = require(path.join(__dirname, "..", "model", "CandidateSchema"));
const Recruiter = require(path.join(__dirname, "..", "model", "RecruiterSchema"));
const Agent = require(path.join(__dirname, "..", "model", "AgentSchema"));
const findUserType = function (role) {
  if (role === "candidate") {
    return Candidate;
  }
  if (role === "agent") {
    return Agent;
  }
  if (role === "recruiter") {
    return Recruiter;
  }
};
module.exports = findUserType;
