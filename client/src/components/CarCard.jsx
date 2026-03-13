import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "" : "http://localhost:5000");

const CarCard = ({ car }) => {
  const fallbacks = [assets.car_image1, assets.car_image2, assets.car_image3, assets.car_image4];
  const fallbackImage = fallbacks[parseInt(car._id?.slice(-1), 16) % fallbacks.length] || assets.car_image1;

  const imageUrl = car.images && car.images.length > 0
    ? (car.images[0].startsWith("http") ? car.images[0] : `${API_BASE}${car.images[0]}`)
    : car.image || fallbackImage;

  const isAvailable = car.available !== false;

  return (
    <Link to={`/cars/${car._id}`} className="block group">
      <div className="card overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Image */}
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          <img
            src={imageUrl}
            alt={car.name || car.model}
            onError={(e) => {
              e.target.src = fallbackImage;
              e.target.onerror = null;
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Availability badge */}
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              isAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}>
              {isAvailable ? "Available Now" : "Unavailable"}
            </span>
          </div>
          {/* Price badge */}
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 text-sm font-semibold text-gray-900">
            ${car.pricePerDay}/day
          </div>
        </div>

        {/* Details */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-0.5">
            {car.name}
          </h3>
          <p className="text-xs text-gray-500 mb-3 capitalize">
            {car.type} • {car.brand} {car.year}
          </p>

          <div className="grid grid-cols-2 gap-y-1.5 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <img src={assets.users_icon} alt="" className="w-3.5 h-3.5 opacity-50" />
              <span>{car.seats} Seats</span>
            </div>
            <div className="flex items-center gap-1.5">
              <img src={assets.fuel_icon} alt="" className="w-3.5 h-3.5 opacity-50" />
              <span className="capitalize">{car.fuelType}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <img src={assets.car_icon} alt="" className="w-3.5 h-3.5 opacity-50" />
              <span className="capitalize">{car.transmission}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <img src={assets.location_icon} alt="" className="w-3.5 h-3.5 opacity-50" />
              <span>{car.location}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
