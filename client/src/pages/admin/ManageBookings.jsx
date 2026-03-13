import { useState, useEffect } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { assets } from "../../assets/assets";

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "" : "http://localhost:5000");

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get("/bookings");
        setBookings(data.bookings || data);
      } catch (err) {
        console.error("Fetch bookings error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await api.patch(`/bookings/${id}/cancel`);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: "cancelled" } : b))
      );
      toast.success("Booking cancelled");
    } catch (err) {
      toast.error("Failed to cancel");
    }
  };

  const statusBadge = (status) => {
    const cls = {
      confirmed: "badge-confirmed",
      cancelled: "badge-cancelled",
      completed: "badge-completed",
      pending: "badge-pending",
      available: "bg-amber-50 text-amber-600 text-xs font-medium px-3 py-1 rounded-full",
    };
    return cls[status] || "badge-pending";
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manage Bookings</h1>
        <p className="text-sm text-gray-500">Track all customer bookings, approve or cancel requests, and manage booking statuses</p>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-5 py-3">Car</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-5 py-3">Date Range</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-5 py-3">Total</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-5 py-3">Status</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">Loading...</td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">No bookings found</td>
              </tr>
            ) : (
              bookings.map((booking) => {
                const car = booking.car;
                const images = car?.images || [];
                const imageUrl = images.length > 0
                  ? (images[0].startsWith("http") ? images[0] : `${API_BASE}${images[0]}`)
                  : assets.car_image1;

                return (
                  <tr key={booking._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img src={imageUrl} alt="" className="w-12 h-8 rounded object-cover bg-gray-100" />
                        <span className="text-sm font-medium text-gray-900">{car?.name || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-600">
                      {format(new Date(booking.pickupDate), "M/dd/yyyy")} To {format(new Date(booking.returnDate), "M/dd/yyyy")}
                    </td>
                    <td className="px-5 py-3 text-sm font-medium text-gray-900">${booking.totalPrice}</td>
                    <td className="px-5 py-3">
                      <span className={statusBadge(booking.status)}>{booking.status}</span>
                    </td>
                    <td className="px-5 py-3">
                      {booking.status === "confirmed" || booking.status === "pending" ? (
                        <button
                          onClick={() => handleCancel(booking._id)}
                          className="text-sm text-gray-500 hover:text-red-500 border border-gray-200 px-3 py-1 rounded-lg flex items-center gap-1 transition-colors"
                        >
                          Cancel <span className="text-xs">▾</span>
                        </button>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
