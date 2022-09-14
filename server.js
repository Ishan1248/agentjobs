// THIRD PARTY MODULES
const path = require("path");

// CORE MODULES
require("dotenv").config({ path: path.join(__dirname, "config.env") });

// SELF MODULES
const dbConnect = require(path.join(__dirname, "config", "db.js"));
const app = require(path.join(__dirname, "app.js"));
dbConnect();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port number ${process.env.PORT}`);
});

process.on("uncaughtException", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit();
});

process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit();
  });
});
