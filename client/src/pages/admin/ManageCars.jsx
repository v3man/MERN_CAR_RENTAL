import { useState, useEffect } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { assets } from "../../assets/assets";

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "" : "http://localhost:5000");

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      const { data } = await api.get("/cars?limit=100");
      setCars(data.cars);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => { fetchCars(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this car?")) return;
    try {
      await api.delete(`/cars/${id}`);
      setCars((prev) => prev.filter((c) => c._id !== id));
      toast.success("Car deleted");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const handleToggle = async (car) => {
    try {
      await api.put(`/cars/${car._id}`, { available: !car.available });
      setCars((prev) =>
        (prev || []).map((c) => c._id === car._id ? { ...c, available: !c.available } : c)
      );
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manage Cars</h1>
        <p className="text-sm text-gray-500">View all listed cars, update their details, or remove them from the booking platform</p>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-5 py-3">Car</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-5 py-3">Category</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-5 py-3">Price</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-5 py-3">Status</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">Loading...</td>
              </tr>
            ) : cars.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">No cars found</td>
              </tr>
            ) : (
              (cars || []).map((car) => {
                const fallbacks = [assets.car_image1, assets.car_image2, assets.car_image3, assets.car_image4];
                const fallbackImage = fallbacks[parseInt(car._id?.slice(-1), 16) % fallbacks.length] || assets.car_image1;

                const imageUrl = car.images?.[0]
                  ? (car.images[0].startsWith("http") ? car.images[0] : `${API_BASE}${car.images[0]}`)
                  : fallbackImage;

                return (
                  <tr key={car._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={imageUrl}
                          alt=""
                          onError={(e) => {
                            e.target.src = fallbackImage;
                            e.target.onerror = null;
                          }}
                          className="w-12 h-8 rounded object-cover bg-gray-100"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{car.name}</div>
                          <div className="text-xs text-gray-400 capitalize">{car.brand} • {car.seats} seats • {car.transmission}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-600 capitalize">{car.type}</td>
                    <td className="px-5 py-3 text-sm text-gray-600">₹{car.pricePerDay}/day</td>
                    <td className="px-5 py-3">
                      <button onClick={() => handleToggle(car)}>
                        <span className={car.available !== false ? "badge-available" : "badge-unavailable"}>
                          {car.available !== false ? "Available" : "Not Available"}
                        </span>
                      </button>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <button onClick={() => window.open(`/cars/${car._id}`, "_blank")}
                          className="text-gray-400 hover:text-gray-600 transition-colors" title="View">
                          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button onClick={() => handleDelete(car._id)}
                          className="text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
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

export default ManageCars;
