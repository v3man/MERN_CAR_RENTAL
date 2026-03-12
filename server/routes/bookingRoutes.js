const express = require("express");
const { body } = require("express-validator");
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
  getAnalytics,
} = require("../controllers/bookingController");
const { protect, authorize } = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = express.Router();

// User routes (auth required)
router.post(
  "/",
  protect,
  [
    body("carId")
      .notEmpty()
      .withMessage("Car ID is required")
      .isMongoId()
      .withMessage("Invalid Car ID format"),
    body("pickupDate")
      .notEmpty()
      .withMessage("Pickup date is required")
      .isISO8601()
      .withMessage("Valid pickup date is required"),
    body("returnDate")
      .notEmpty()
      .withMessage("Return date is required")
      .isISO8601()
      .withMessage("Valid return date is required"),
  ],
  validate,
  createBooking
);
router.get("/my", protect, getMyBookings);
router.patch("/:id/cancel", protect, cancelBooking);

// Admin routes
router.get("/", protect, authorize("admin"), getAllBookings);
router.get("/analytics", protect, authorize("admin"), getAnalytics);

module.exports = router;
