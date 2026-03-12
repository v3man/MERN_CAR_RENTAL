require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const mongoose = require("mongoose");

async function makeAdmin() {
  await mongoose.connect(process.env.MONGO_URI, { family: 4 });
  const result = await mongoose.connection.db
    .collection("users")
    .updateOne({ email: "admin@carrental.com" }, { $set: { role: "admin" } });
  console.log("Admin role set:", result.modifiedCount, "user(s) updated");
  process.exit(0);
}

makeAdmin().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
