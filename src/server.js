const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT || 8080;

// Databse connection
async function main() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Database connection successful");

    app.listen(port, () => {
      console.log(`Mongoose listening on port ${port}`);
    });
  } catch {
    console.log("Failed to connect with database");
  }
}

main();
