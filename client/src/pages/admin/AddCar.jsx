import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { assets } from "../../assets/assets";

const AddCar = () => {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    brand: "", name: "", year: 2025, pricePerDay: 100, type: "sedan",
    transmission: "automatic", fuelType: "diesel", seats: 5,
    location: "", description: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let imageUrls = [];
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const { data: imgData } = await api.post("/cars/upload-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrls = [imgData.url];
      }

      await api.post("/cars", { ...form, images: imageUrls });
      toast.success("Car listed successfully!");
      navigate("/admin/cars");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add car");
    } finally {
      setSubmitting(false);
    }
  };

  const carTypes = ["sedan", "suv", "hatchback", "luxury", "sports", "van"];
  const transmissions = ["automatic", "manual", "semi-automatic"];
  const fuelTypes = ["petrol", "diesel", "electric", "hybrid"];

  return (
    <div className="p-8 max-w-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add New Car</h1>
        <p className="text-sm text-gray-500">Fill in details to list a new car for booking, including pricing, availability, and car specifications.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Image upload */}
        <div className="flex items-center gap-4">
          <label className="w-16 h-16 rounded-lg bg-gray-50 border border-gray-200 border-dashed flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden">
            {imagePreview ? (
              <img src={imagePreview} alt="" className="w-full h-full object-cover" />
            ) : (
              <img src={assets.upload_icon} alt="" className="w-6 h-6 opacity-40" />
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
          <span className="text-sm text-gray-500">Upload a picture of your car</span>
        </div>

        {/* Brand & Model */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Brand</label>
            <input type="text" required value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              placeholder="e.g. BMW, Mercedes, Audi..." className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Model</label>
            <input type="text" required value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. X5, E-Class, M4..." className="input-field" />
          </div>
        </div>

        {/* Year, Price, Category */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Year</label>
            <input type="number" value={form.year}
              onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
              className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Daily Price ($)</label>
            <input type="number" min="0" value={form.pricePerDay}
              onChange={(e) => setForm({ ...form, pricePerDay: Number(e.target.value) })}
              className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="input-field">
              {carTypes.map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}
            </select>
          </div>
        </div>

        {/* Transmission, Fuel, Seats */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Transmission</label>
            <select value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value })}
              className="input-field">
              {transmissions.map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Fuel Type</label>
            <select value={form.fuelType} onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
              className="input-field">
              {fuelTypes.map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Seating Capacity</label>
            <input type="number" min="1" max="15" value={form.seats}
              onChange={(e) => setForm({ ...form, seats: Number(e.target.value) })}
              className="input-field" />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
          <input type="text" required value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="eg. San Francisco, CA" className="input-field" />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea rows={4} value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe your car, its condition, and any notable details..."
            className="input-field resize-none" />
        </div>

        <button type="submit" disabled={submitting}
          className="btn-primary flex items-center gap-2 disabled:opacity-50">
          <img src={assets.tick_icon} alt="" className="w-3.5 h-3.5 invert" />
          {submitting ? "Listing..." : "List Your Car"}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
