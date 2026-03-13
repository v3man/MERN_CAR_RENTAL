require("dotenv").config();
const mongoose = require("mongoose");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const Car = require("./models/Car");

async function dump() {
  await mongoose.connect(process.env.MONGO_URI, { family: 4 });
  const cars = await Car.find({});
  console.log(JSON.stringify(cars, null, 2));
  process.exit(0);
}
dump().catch(e => { console.error(e); process.exit(1); });
