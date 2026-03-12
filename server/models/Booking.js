const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    pickupDate: {
      type: Date,
      required: [true, "Pickup date is required"],
    },
    returnDate: {
      type: Date,
      required: [true, "Return date is required"],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled", "completed"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

// Indexes for queries
bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ car: 1, pickupDate: 1, returnDate: 1 });

module.exports = mongoose.model("Booking", bookingSchema);
