const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Car name is required"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["sedan", "suv", "hatchback", "luxury", "sports", "van", "coupe", "supercar"],
    },
    year: {
      type: Number,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
      min: 1,
      max: 15,
    },
    transmission: {
      type: String,
      required: true,
      enum: ["automatic", "manual"],
    },
    fuelType: {
      type: String,
      required: true,
      enum: ["petrol", "diesel", "electric", "hybrid"],
    },
    pricePerDay: {
      type: Number,
      required: [true, "Price per day is required"],
      min: 0,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    images: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Indexes for performance
carSchema.index({ location: 1, available: 1 });
carSchema.index({ brand: 1 });
carSchema.index({ type: 1 });
carSchema.index({ pricePerDay: 1 });

module.exports = mongoose.model("Car", carSchema);
