const express = require("express");
const { body } = require("express-validator");
const {
  signup,
  login,
  refresh,
  logout,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = express.Router();

router.post(
  "/signup",
  [
    body("name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Name should only contain letters and spaces"),
    body("email").trim().isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter"),
  ],
  validate,
  signup
);

router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  login
);

router.post(
  "/refresh",
  [body("refreshToken").optional()],
  validate,
  refresh
);

router.post("/logout", protect, logout);

module.exports = router;
