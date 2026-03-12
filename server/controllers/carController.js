const Car = require("../models/Car");
const imagekit = require("../config/imagekit");

// @desc    Get all cars (with filters & pagination)
// @route   GET /api/cars
const getCars = async (req, res) => {
  try {
    const {
      location,
      type,
      brand,
      transmission,
      fuelType,
      minPrice,
      maxPrice,
      search,
      page = 1,
      limit = 12,
    } = req.query;

    const filter = { available: true };

    if (location) filter.location = new RegExp(location, "i");
    if (type) filter.type = type;
    if (brand) filter.brand = new RegExp(brand, "i");
    if (transmission) filter.transmission = transmission;
    if (fuelType) filter.fuelType = fuelType;
    if (minPrice || maxPrice) {
      filter.pricePerDay = {};
      if (minPrice) filter.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerDay.$lte = Number(maxPrice);
    }
    if (search) {
      filter.$or = [
        { name: new RegExp(search, "i") },
        { brand: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Car.countDocuments(filter);
    const cars = await Car.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      cars,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      total,
    });
  } catch (error) {
    console.error("getCars error:", error.message);
    res.status(500).json({ message: "Failed to fetch cars" });
  }
};

// @desc    Get single car
// @route   GET /api/cars/:id
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    console.error("getCarById error:", error.message);
    res.status(500).json({ message: "Failed to fetch car" });
  }
};

// @desc    Create car (Admin)
// @route   POST /api/cars
const createCar = async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (error) {
    console.error("createCar error:", error.message);
    res.status(500).json({ message: error.message || "Failed to create car" });
  }
};

// @desc    Update car (Admin)
// @route   PUT /api/cars/:id
const updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    console.error("updateCar error:", error.message);
    res.status(500).json({ message: error.message || "Failed to update car" });
  }
};

// @desc    Delete car (Admin)
// @route   DELETE /api/cars/:id
const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("deleteCar error:", error.message);
    res.status(500).json({ message: "Failed to delete car" });
  }
};

// @desc    Upload car image to ImageKit (Admin)
// @route   POST /api/cars/upload-image
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // Upload to ImageKit
    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: `car_${Date.now()}_${req.file.originalname}`,
      folder: "/car-rental/cars",
    });

    res.json({ url: result.url });
  } catch (error) {
    console.error("uploadImage error:", error.message);
    res.status(500).json({ message: "Failed to upload image" });
  }
};

module.exports = {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  uploadImage,
};
