require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const mongoose = require("mongoose");

async function fix() {
  await mongoose.connect(process.env.MONGO_URI, { family: 4 });
  const r = await mongoose.connection.db.collection("cars").updateOne(
    { name: "Toyota Corolla" },
    { $set: { images: ["https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800&q=80"] } }
  );
  console.log("Fixed:", r.modifiedCount);
  process.exit(0);
}
fix().catch(e => { console.error(e); process.exit(1); });
