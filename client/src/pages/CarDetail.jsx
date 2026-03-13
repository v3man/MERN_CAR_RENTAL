import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import BookingModal from "../components/BookingModal";
import { assets } from "../assets/assets";

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "" : "http://localhost:5000");

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await api.get(`/cars/${id}`);
        setCar(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="card h-72 animate-pulse bg-gray-50 mb-6"></div>
        <div className="card h-48 animate-pulse bg-gray-50"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-24 text-center">
        <p className="text-gray-500 text-lg">Car not found</p>
      </div>
    );
  }

  const imageUrl = car.images && car.images.length > 0
    ? (car.images[0].startsWith("http") ? car.images[0] : `${API_BASE}${car.images[0]}`)
    : assets.car_image1;

  const specs = [
    { icon: assets.users_icon, value: `${car.seats} Seats` },
    { icon: assets.fuel_icon, value: car.fuelType },
    { icon: assets.car_icon, value: car.transmission },
    { icon: assets.location_icon, value: car.location },
  ];

  const features = ["Leather Seats", "Panoramic Sunroof", "Wireless Charging", "360 Camera"];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back link */}
      <Link to="/cars" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
        ← Back to all cars
      </Link>

      {/* Main grid: Image + Booking card */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
        {/* Image */}
        <div className="lg:col-span-3 rounded-xl overflow-hidden bg-gray-100">
          <img src={imageUrl} alt={car.name} className="w-full h-72 md:h-80 object-cover" />
        </div>

        {/* Booking card */}
        <div className="lg:col-span-2">
          <div className="card p-6 sticky top-20">
            <div className="flex items-baseline justify-between mb-6">
              <span className="text-3xl font-bold text-gray-900">${car.pricePerDay}</span>
              <span className="text-sm text-gray-400">per day</span>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Pickup Date</label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Return Date</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <button
              onClick={() => setShowBooking(true)}
              disabled={!car.available}
              className="w-full btn-primary py-3 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Book Now
            </button>
            <p className="text-center text-xs text-gray-400 mt-2">No credit card required to reserve</p>
          </div>
        </div>
      </div>

      {/* Info below image */}
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{car.name}</h1>
        <p className="text-sm text-gray-500 mb-6">{car.year} • {car.type}</p>

        {/* Spec pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          {specs.map((s, i) => (
            <div key={i} className="flex items-center gap-2 px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl">
              <img src={s.icon} alt="" className="w-5 h-5 opacity-50" />
              <span className="text-sm text-gray-700 capitalize">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {car.description || `The ${car.brand} ${car.name} is a mid-size luxury ${car.type} produced by ${car.brand}. The ${car.name} made its debut as one of the first ${car.type} vehicles ever produced by ${car.brand}.`}
          </p>
        </div>

        {/* Features */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
          <div className="grid grid-cols-2 gap-2">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-primary-600">
                <img src={assets.tick_icon} alt="" className="w-4 h-4" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        car={car}
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        initialPickup={pickupDate}
        initialReturn={returnDate}
      />
    </div>
  );
};

export default CarDetail;
