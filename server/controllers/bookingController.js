const Booking = require("../models/Booking");
const Car = require("../models/Car");

// @desc    Create a booking
// @route   POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const { carId, pickupDate, returnDate } = req.body;

    // Validate dates
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    const now = new Date();

    if (pickup < now) {
      return res.status(400).json({ message: "Pickup date must be in the future" });
    }
    if (returnD <= pickup) {
      return res.status(400).json({ message: "Return date must be after pickup date" });
    }

    // Check car exists and is available
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    if (!car.available) {
      return res.status(400).json({ message: "Car is not available" });
    }

    // Check for overlapping bookings
    const overlap = await Booking.findOne({
      car: carId,
      status: "confirmed",
      $or: [
        {
          pickupDate: { $lte: returnD },
          returnDate: { $gte: pickup },
        },
      ],
    });

    if (overlap) {
      return res.status(400).json({
        message: "Car is already booked for the selected dates",
      });
    }

    // Calculate total price
    const days = Math.ceil((returnD - pickup) / (1000 * 60 * 60 * 24));
    const totalPrice = days * car.pricePerDay;

    const booking = await Booking.create({
      user: req.user._id,
      car: carId,
      pickupDate: pickup,
      returnDate: returnD,
      totalPrice,
      status: "confirmed",
    });

    const populatedBooking = await Booking.findById(booking._id).populate(
      "car",
      "name brand images pricePerDay location"
    );

    res.status(201).json(populatedBooking);
  } catch (error) {
    console.error("createBooking error:", error.message);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

// @desc    Get current user's bookings
// @route   GET /api/bookings/my
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("car", "name brand images pricePerDay location type")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error("getMyBookings error:", error.message);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
const getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const total = await Booking.countDocuments();
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("car", "name brand images pricePerDay location")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      bookings,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      total,
    });
  } catch (error) {
    console.error("getAllBookings error:", error.message);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

// @desc    Cancel a booking
// @route   PATCH /api/bookings/:id/cancel
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only the booking owner or admin can cancel
    if (
      booking.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized to cancel this booking" });
    }

    if (booking.status !== "confirmed") {
      return res.status(400).json({ message: "Only confirmed bookings can be cancelled" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    console.error("cancelBooking error:", error.message);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

// @desc    Get booking analytics (Admin)
// @route   GET /api/bookings/analytics
const getAnalytics = async (req, res) => {
  try {
    const totalCars = await Car.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: "confirmed" });
    const cancelledBookings = await Booking.countDocuments({ status: "cancelled" });
    const completedBookings = await Booking.countDocuments({ status: "completed" });

    // Revenue from confirmed + completed bookings
    const revenueResult = await Booking.aggregate([
      { $match: { status: { $in: ["confirmed", "completed"] } } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
    ]);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    // Monthly revenue for last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyRevenue = await Booking.aggregate([
      {
        $match: {
          status: { $in: ["confirmed", "completed"] },
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: "$totalPrice" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Recent bookings
    const recentBookings = await Booking.find()
      .populate("user", "name email")
      .populate("car", "name brand")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalCars,
      totalBookings,
      confirmedBookings,
      cancelledBookings,
      completedBookings,
      totalRevenue,
      monthlyRevenue,
      recentBookings,
    });
  } catch (error) {
    console.error("getAnalytics error:", error.message);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
  getAnalytics,
};
