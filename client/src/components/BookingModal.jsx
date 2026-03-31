import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { differenceInDays } from "date-fns";

const BookingModal = ({ car, isOpen, onClose, initialPickup = "", initialReturn = "" }) => {
  const navigate = useNavigate();
  const [pickupDate, setPickupDate] = useState(initialPickup);
  const [returnDate, setReturnDate] = useState(initialReturn);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const days = pickupDate && returnDate
    ? Math.max(1, differenceInDays(new Date(returnDate), new Date(pickupDate)))
    : 0;
  const total = days * (car?.pricePerDay || 0);

  const handleBook = async () => {
    if (!pickupDate || !returnDate) {
      toast.error("Please select both dates");
      return;
    }
    if (new Date(returnDate) <= new Date(pickupDate)) {
      toast.error("Return date must be after pickup date");
      return;
    }
    setLoading(true);
    try {
      await api.post("/bookings", { carId: car._id, pickupDate, returnDate });
      toast.success("Booking confirmed!");
      onClose();
      navigate("/my-bookings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Confirm Booking</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
        </div>

        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="font-medium text-gray-900">{car?.name}</div>
          <div className="text-sm text-gray-500">₹{car?.pricePerDay}/day</div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Pickup Date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Return Date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              min={pickupDate || new Date().toISOString().split("T")[0]}
              className="input-field"
            />
          </div>
        </div>


        {days > 0 && (
          <div className="flex items-center justify-between py-3 border-t border-gray-100 mb-4">
            <span className="text-sm text-gray-500">{days} day{days > 1 ? "s" : ""} × ₹{car?.pricePerDay}</span>
            <span className="text-lg font-bold text-gray-900">₹{total}</span>
          </div>
        )}

        <button
          onClick={handleBook}
          disabled={loading || !days}
          className="w-full btn-primary py-3 disabled:opacity-40"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
