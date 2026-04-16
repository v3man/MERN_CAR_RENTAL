import { useState, useEffect } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { assets } from "../assets/assets";

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "" : "http://localhost:5000");

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get("/bookings/my");
        setBookings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await api.patch(`/bookings/${id}/cancel`);
      setBookings((prev) =>
        (prev || []).map((b) => (b._id === id ? { ...b, status: "cancelled" } : b))
      );
      toast.success("Booking cancelled");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel");
      console.error("Cancel API Error: ", error);
    }
  };

  const statusBadge = (status) => {
    const cls = {
      confirmed: "badge-confirmed",
      cancelled: "badge-cancelled",
      completed: "badge-completed",
      pending: "badge-pending",
    };
    return cls[status] || "badge-pending";
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">My Bookings</h1>
      <p className="text-sm text-gray-500 mb-8">View and manage your car bookings</p>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card h-36 animate-pulse bg-gray-50"></div>
          ))}
        </div>
      ) : bookings.length > 0 ? (
        <div className="space-y-4">
          {(bookings || []).map((booking, index) => {
            const car = booking.car;
            const imgPath = car?.images?.[0] ? car.images[0].replace(/\\/g, '/') : null;
            const imageUrl = imgPath
              ? (imgPath.startsWith("http") ? imgPath : `${API_BASE}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`)
              : assets.car_image1;

            return (
              <div key={booking._id} className="card p-5 flex flex-col md:flex-row gap-5">
                {/* Image */}
                <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  <img 
                    src={imageUrl} 
                    alt={car?.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = assets.car_image1;
                      e.target.onerror = null;
                    }}
                  />
                </div>

                {/* Middle — Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-gray-400 font-medium">Booking #{index + 1}</span>
                    <span className={statusBadge(booking.status)}>{booking.status}</span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <img src={assets.calendar_icon_colored} alt="" className="w-4 h-4" />
                      <span>Rental Period</span>
                    </div>
                    <div className="font-medium text-gray-900 ml-6">
                      {format(new Date(booking.pickupDate), "M/dd/yyyy")} - {format(new Date(booking.returnDate), "M/dd/yyyy")}
                    </div>

                    <div className="flex items-center gap-2 text-gray-500">
                      <img src={assets.location_icon_colored} alt="" className="w-4 h-4" />
                      <span>Pick-up Location</span>
                    </div>
                    <div className="font-medium text-gray-900 ml-6">{car?.location || "N/A"}</div>
                  </div>

                  <div className="mt-3">
                    <h3 className="font-semibold text-gray-900">{car?.name || "Car"}</h3>
                    <p className="text-xs text-gray-500">{car?.year} • {car?.type} • {car?.location}</p>
                  </div>
                </div>

                {/* Right — Price + Cancel */}
                <div className="text-right flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-gray-400">Total Price</div>
                    <div className="text-2xl font-bold text-gray-900">₹{booking.totalPrice}</div>
                    <div className="text-xs text-gray-400">
                      Booked on {format(new Date(booking.createdAt), "M/d/yyyy")}
                    </div>
                  </div>
                  {booking.status === "confirmed" && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="mt-3 text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <img src={assets.calendar_icon_colored} alt="" className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No bookings yet</h3>
          <p className="text-gray-500 text-sm">Browse our cars and make your first reservation!</p>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
