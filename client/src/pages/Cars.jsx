import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import CarCard from "../components/CarCard";
import { assets, dummyCarData } from "../assets/assets";

const Cars = () => {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  const fetchCars = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 9 });
      if (search) params.append("search", search);
      if (location) params.append("location", location);
      const { data } = await api.get(`/cars?${params}`);
      setCars(data.cars);
      setTotalPages(data.totalPages);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
      // Fallback to dummy data when backend is unavailable
      let filteredDummy = [...dummyCarData];
      if (location) {
        filteredDummy = filteredDummy.filter(car => 
          car.location.toLowerCase().includes(location.toLowerCase())
        );
      }
      if (search) {
        filteredDummy = filteredDummy.filter(car => 
          car.brand.toLowerCase().includes(search.toLowerCase()) ||
          car.model.toLowerCase().includes(search.toLowerCase()) ||
          car.description.toLowerCase().includes(search.toLowerCase())
        );
      }
      setCars(filteredDummy);
      setTotalPages(1);
      setTotal(filteredDummy.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCars(); }, [page, location]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchCars();
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-b from-primary-50/60 to-white pt-10 pb-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Cars</h1>
          <p className="text-gray-500 mb-8">Browse our selection of premium vehicles available for your next adventure</p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
            <img src={assets.search_icon} alt="" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
            <input
              type="text"
              placeholder="Search by make, model, or features"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary-500 shadow-sm"
            />
            <button type="button" className="absolute right-3.5 top-1/2 -translate-y-1/2">
              <img src={assets.filter_icon} alt="" className="w-4 h-4 opacity-40" />
            </button>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {!loading && (
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <p className="text-sm text-gray-500">Showing {cars.length} Cars</p>
            {location && (
              <div className="flex items-center gap-2 bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium border border-primary-100">
                <span>Location: {location}</span>
                <button 
                  onClick={() => { setLocation(""); setPage(1); }}
                  className="hover:text-primary-900 transition-colors"
                >
                  <img src={assets.close_icon} alt="clear" className="w-2.5 h-2.5 opacity-60" />
                </button>
              </div>
            )}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card h-72 animate-pulse bg-gray-50"></div>
            ))}
          </div>
        ) : cars.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(cars || []).map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                      page === i + 1
                        ? "bg-primary-500 text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <img src={assets.search_icon} alt="" className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No cars found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cars;
