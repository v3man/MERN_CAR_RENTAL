import { useState, useEffect } from "react";
import api from "../../api/axios";
import { assets } from "../../assets/assets";
import { format } from "date-fns";

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await api.get("/bookings/analytics");
        setAnalytics(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card h-24 animate-pulse bg-gray-50"></div>
          ))}
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Total Cars", value: analytics?.totalCars || 0, icon: assets.carIconColored },
    { label: "Total Bookings", value: analytics?.totalBookings || 0, icon: assets.listIconColored },
    { label: "Pending Bookings", value: analytics?.pendingBookings || 0, icon: assets.cautionIconColored },
    { label: "Completed Bookings", value: analytics?.completedBookings || 0, icon: assets.calendar_icon_colored },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">Monitor overall platform performance including total cars, bookings, revenue, and recent activities</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="card p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </div>
            <img src={stat.icon} alt="" className="w-8 h-8 opacity-60" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-3 card p-6">
          <h3 className="font-semibold text-gray-900 mb-1">Recent Bookings</h3>
          <p className="text-xs text-gray-400 mb-4">Latest customer bookings</p>

          {analytics?.recentBookings && analytics.recentBookings.length > 0 ? (
            <div className="space-y-3">
              {analytics.recentBookings.map((b) => (
                <div key={b._id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                      <img src={assets.carIconColored} alt="" className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{b.car?.name || "N/A"}</div>
                      <div className="text-xs text-gray-400">
                        {b.createdAt ? format(new Date(b.createdAt), "M/d/yyyy") : "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">₹{b.totalPrice}</span>
                    <span className={`text-xs font-medium capitalize ${
                      b.status === "confirmed" ? "text-green-600" :
                      b.status === "completed" ? "text-blue-600" :
                      b.status === "pending" ? "text-amber-600" : "text-gray-500"
                    }`}>
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No recent bookings</p>
          )}
        </div>

        {/* Monthly Revenue */}
        <div className="lg:col-span-2 card p-6">
          <h3 className="font-semibold text-gray-900 mb-1">Monthly Revenue</h3>
          <p className="text-xs text-gray-400 mb-4">Revenue for current month</p>
          <div className="text-3xl font-bold text-primary-500">
            ₹{(analytics?.totalRevenue || 0).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
