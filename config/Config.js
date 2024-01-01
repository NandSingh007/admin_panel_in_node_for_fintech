const dotenv = require("dotenv");
dotenv.config();

// Configuration object with various settings
const config = {
  // MongoDB connection URI
  mongoURI: process.env.MONGODB, // Use the environment variable here
  // Port for the server to listen on (use environment variable or default to 8080)
  port: process.env.PORT || 8080
};

module.exports = config;
