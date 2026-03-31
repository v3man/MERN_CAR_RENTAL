const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config({ path: path.join(__dirname, ".env") });

async function checkUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const users = await User.find({}, "name email role");
    console.log("Users found:", JSON.stringify(users, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkUsers();
