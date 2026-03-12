require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const mongoose = require("mongoose");

async function seedBookings() {
  await mongoose.connect(process.env.MONGO_URI, { family: 4 });
  console.log("Connected to MongoDB");

  const db = mongoose.connection.db;

  // Get all cars and users
  const cars = await db.collection("cars").find().toArray();
  const users = await db.collection("users").find({ role: "user" }).toArray();

  if (cars.length === 0) {
    console.log("No cars found — run seedCars.js first");
    process.exit(1);
  }

  // Create a test user if none exists
  let userId;
  if (users.length === 0) {
    const bcrypt = require("bcryptjs");
    const hashed = await bcrypt.hash("test123456", 12);
    const result = await db.collection("users").insertOne({
      name: "John Doe",
      email: "john@example.com",
      password: hashed,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    userId = result.insertedId;
    console.log("Created test user: john@example.com");
  } else {
    userId = users[0]._id;
    console.log("Using existing user:", users[0].name);
  }

  // Create sample bookings
  const now = new Date();
  const bookings = [
    {
      user: userId,
      car: cars[0]._id,
      pickupDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
      returnDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
      totalPrice: cars[0].pricePerDay * 3,
      status: "confirmed",
      createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    },
    {
      user: userId,
      car: cars[1]._id,
      pickupDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      returnDate: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000),
      totalPrice: cars[1].pricePerDay * 3,
      status: "confirmed",
      createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    },
    {
      user: userId,
      car: cars[2]._id,
      pickupDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
      returnDate: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      totalPrice: cars[2].pricePerDay * 3,
      status: "completed",
      createdAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    },
    {
      user: userId,
      car: cars[3]._id,
      pickupDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
      returnDate: new Date(now.getTime() + 18 * 24 * 60 * 60 * 1000),
      totalPrice: cars[3].pricePerDay * 4,
      status: "confirmed",
      createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    },
    {
      user: userId,
      car: cars[4]._id,
      pickupDate: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000),
      returnDate: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
      totalPrice: cars[4].pricePerDay * 5,
      status: "cancelled",
      createdAt: new Date(now.getTime() - 22 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    },
  ];

  // Clear existing bookings and insert new ones
  await db.collection("bookings").deleteMany({});
  const result = await db.collection("bookings").insertMany(bookings);
  console.log(`Seeded ${result.insertedCount} bookings successfully!`);
  process.exit(0);
}

seedBookings().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
