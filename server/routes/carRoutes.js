const express = require("express");
const multer = require("multer");
const {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  uploadImage,
} = require("../controllers/carController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Multer memory storage — keeps file in buffer for ImageKit upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

// Public routes
router.get("/", getCars);
router.get("/:id", getCarById);

// Admin routes
router.post("/", protect, authorize("admin"), createCar);
router.put("/:id", protect, authorize("admin"), updateCar);
router.delete("/:id", protect, authorize("admin"), deleteCar);
router.post(
  "/upload-image",
  protect,
  authorize("admin"),
  upload.single("image"),
  uploadImage
);

module.exports = router;
