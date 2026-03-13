const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const mongoose = require("mongoose");
const Car = require("./models/Car");

const cars = [
  {
    name: "BMW X5",
    brand: "BMW",
    type: "suv",
    year: 2023,
    pricePerDay: 300,
    seats: 5,
    fuelType: "hybrid",
    transmission: "automatic",
    location: "New York",
    description: "The BMW X5 is a mid-size luxury SUV with powerful performance, spacious interior, and cutting-edge technology.",
    images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800"],
    available: true,
  },
  {
    name: "Toyota Corolla",
    brand: "Toyota",
    type: "sedan",
    year: 2022,
    pricePerDay: 130,
    seats: 5,
    fuelType: "petrol",
    transmission: "manual",
    location: "Chicago",
    description: "The Toyota Corolla is a reliable and fuel-efficient compact sedan, perfect for daily commuting.",
    images: ["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800"],
    available: true,
  },
  {
    name: "Jeep Wrangler",
    brand: "Jeep",
    type: "suv",
    year: 2023,
    pricePerDay: 200,
    seats: 4,
    fuelType: "petrol",
    transmission: "automatic",
    location: "Los Angeles",
    description: "The Jeep Wrangler is an iconic off-road SUV built for adventure with rugged capability and open-air freedom.",
    images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800"],
    available: true,
  },
  {
    name: "Mercedes C-Class",
    brand: "Mercedes",
    type: "sedan",
    year: 2024,
    pricePerDay: 350,
    seats: 5,
    fuelType: "petrol",
    transmission: "automatic",
    location: "New York",
    description: "The Mercedes C-Class delivers an exquisite blend of luxury comfort, refined performance, and advanced safety.",
    images: ["https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=800"],
    available: true,
  },
  {
    name: "Audi Q7",
    brand: "Audi",
    type: "suv",
    year: 2023,
    pricePerDay: 280,
    seats: 7,
    fuelType: "diesel",
    transmission: "automatic",
    location: "Chicago",
    description: "The Audi Q7 is a full-size luxury SUV with three rows of seating, quattro all-wheel drive, and premium interior.",
    images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=800"],
    available: true,
  },
  {
    name: "Honda Civic",
    brand: "Honda",
    type: "sedan",
    year: 2022,
    pricePerDay: 110,
    seats: 5,
    fuelType: "petrol",
    transmission: "manual",
    location: "Los Angeles",
    description: "The Honda Civic is a sporty and efficient compact sedan known for its reliability and excellent driving dynamics.",
    images: ["https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800"],
    available: true,
  },
  {
    name: "Tesla Model 3",
    brand: "Tesla",
    type: "sedan",
    year: 2024,
    pricePerDay: 400,
    seats: 5,
    fuelType: "electric",
    transmission: "automatic",
    location: "Houston",
    description: "The Tesla Model 3 is a fully electric sedan with autopilot technology, zero emissions, and impressive range.",
    images: ["https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800"],
    available: true,
  },
  {
    name: "Range Rover Sport",
    brand: "Range Rover",
    type: "suv",
    year: 2023,
    pricePerDay: 450,
    seats: 5,
    fuelType: "hybrid",
    transmission: "automatic",
    location: "New York",
    description: "The Range Rover Sport combines luxury with powerful off-road capability, featuring a premium interior and dynamic handling.",
    images: ["https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&q=80&w=800"],
    available: true,
  },
  {
    name: "Ford Mustang",
    brand: "Ford",
    type: "coupe",
    year: 2023,
    pricePerDay: 320,
    seats: 4,
    fuelType: "petrol",
    transmission: "automatic",
    location: "Houston",
    description: "The Ford Mustang is an iconic American muscle car delivering thrilling performance with its powerful V8 engine.",
    images: ["https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800"],
    available: true,
  },
  {
    name: "Kia Concept EV",
    brand: "Kia",
    type: "suv",
    year: 2025,
    pricePerDay: 350,
    seats: 5,
    fuelType: "electric",
    transmission: "automatic",
    location: "Los Angeles",
    description: "A futuristic vision of sustainable luxury, the Kia Concept EV features a sleek aerodynamic design and cutting-edge electric performance.",
    images: ["/uploads/cars/kia-concept.png"],
    available: true,
  },
  {
    name: "Mustang Steeda Edition",
    brand: "Ford",
    type: "coupe",
    year: 2024,
    pricePerDay: 380,
    seats: 4,
    fuelType: "petrol",
    transmission: "automatic",
    location: "Houston",
    description: "The Steeda Edition Mustang takes performance to the next level with precision tuning, aggressive styling, and a roar that commands attention.",
    images: ["/uploads/cars/mustang-steeda.png"],
    available: true,
  },
  {
    name: "Mercedes-Benz A-Class",
    brand: "Mercedes",
    type: "hatchback",
    year: 2023,
    pricePerDay: 150,
    seats: 5,
    fuelType: "petrol",
    transmission: "automatic",
    location: "New York",
    description: "Compact luxury at its finest, the A-Class offers a refined driving experience with a premium interior and agile handling.",
    images: ["/uploads/cars/mercedes-a-class.png"],
    available: true,
  },
  {
    name: "Mercedes-AMG GT",
    brand: "Mercedes-AMG",
    type: "coupe",
    year: 2024,
    pricePerDay: 500,
    seats: 2,
    fuelType: "petrol",
    transmission: "automatic",
    location: "Chicago",
    description: "A true thoroughbred sports car, the AMG GT delivers heart-pounding performance and a design that is both elegant and powerful.",
    images: ["/uploads/cars/mercedes-amg-gt.png"],
    available: true,
  },
  {
    name: "McLaren 720S",
    brand: "McLaren",
    type: "supercar",
    year: 2023,
    pricePerDay: 800,
    seats: 2,
    fuelType: "petrol",
    transmission: "automatic",
    location: "Los Angeles",
    description: "The McLaren 720S is a masterpiece of engineering, offering breathtaking acceleration and a futuristic design that pushes the boundaries of performance.",
    images: ["/uploads/cars/mclaren-720s.png"],
    available: true,
  },
];

async function seedCars() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { family: 4 });
    console.log("Connected to MongoDB");

    // Clear existing cars
    await Car.deleteMany({});
    console.log("Cleared existing cars");

    // Insert new cars
    await Car.insertMany(cars);

    console.log(`Seeded ${cars.length} cars successfully!`);
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
}

seedCars();
