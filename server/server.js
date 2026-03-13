const express = require("express");
const path = require("path");
const cors = require("cors");
const compression = require("compression");
const dotenv = require("dotenv");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

// Load env vars
dotenv.config({ path: path.join(__dirname, ".env") });

// Import routes
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Security Middlewares
// Set security HTTP headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Allow images to load cross-origin

// Data sanitization against NoSQL query injection
app.use((req, res, next) => {
  if (req.body) req.body = mongoSanitize.sanitize(req.body);
  if (req.params) req.params = mongoSanitize.sanitize(req.params);
  if (req.headers) req.headers = mongoSanitize.sanitize(req.headers);
  
  if (req.query) {
    // Modify in place, don't reassign req.query
    mongoSanitize.sanitize(req.query, { replaceWith: "_" });
  }
  next();
});

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { message: "Too many requests from this IP, please try again after 15 minutes" },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", apiLimiter);

// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Body parsing — MUST come before routes
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Compression
app.use(compression());

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Global error handler (Express 5 compatible — must have 4 params)
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Serve Frontend
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
