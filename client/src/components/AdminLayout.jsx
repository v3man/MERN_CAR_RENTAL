import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { assets } from "../assets/assets";

const adminLinks = [
  { name: "Dashboard", path: "/admin/dashboard", icon: assets.dashboardIcon, activeIcon: assets.dashboardIconColored },
  { name: "Add Car", path: "/admin/add-car", icon: assets.addIcon, activeIcon: assets.addIconColored },
  { name: "Manage Cars", path: "/admin/cars", icon: assets.carIcon, activeIcon: assets.carIconColored },
  { name: "Manage Bookings", path: "/admin/bookings", icon: assets.listIcon, activeIcon: assets.listIconColored },
  { name: "Support", path: "/admin/support", icon: assets.gmail_logo, activeIcon: assets.gmail_logo },
];

const AdminLayout = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className="w-56 border-r border-gray-100 bg-white flex-shrink-0 py-6">
        {/* User profile */}
        <div className="px-5 mb-8 text-center">
          <img
            src={assets.user_profile}
            alt={user?.name}
            className="w-14 h-14 rounded-full mx-auto mb-2 object-cover"
          />
          <div className="text-sm font-medium text-gray-900">{user?.name || "Admin"}</div>
        </div>

        {/* Nav links */}
        <nav className="space-y-1 px-3">
          {adminLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/admin/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary-500 bg-primary-50/50 border-l-3 border-primary-500"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <img src={isActive ? link.activeIcon : link.icon} alt="" className="w-4.5 h-4.5" />
                  {link.name}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Social links at bottom */}
        <div className="mt-auto px-5 pt-8 flex gap-3">
          <img src={assets.facebook_logo} alt="" className="w-4 h-4 opacity-40" />
          <img src={assets.instagram_logo} alt="" className="w-4 h-4 opacity-40" />
          <img src={assets.twitter_logo} alt="" className="w-4 h-4 opacity-40" />
          <img src={assets.gmail_logo} alt="" className="w-4 h-4 opacity-40" />
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 bg-gray-50/30">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
