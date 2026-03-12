import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { assets, menuLinks } from "../assets/assets";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/cars?search=${search.trim()}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={assets.logo} alt="CarRental" className="h-7" />
          </Link>

          {/* Center nav */}
          <div className="hidden md:flex items-center gap-8">
            {menuLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary-500 ${
                    isActive ? "text-primary-600" : "text-gray-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search cars"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-44 pl-3 pr-9 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary-500"
              />
              <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2">
                <img src={assets.search_icon} alt="" className="w-4 h-4 opacity-40" />
              </button>
            </form>

            {user ? (
              <div className="flex items-center gap-3">
                {user.role === "admin" && (
                  <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors hover:text-primary-500 ${
                        isActive ? "text-primary-600" : "text-gray-600"
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                )}
                <span className="text-sm text-gray-500">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/signup"
                className="btn-primary"
              >
                Sign up
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            <img
              src={open ? assets.close_icon : assets.menu_icon}
              alt="menu"
              className="w-5 h-5 opacity-60"
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-64 opacity-100 py-4 border-t border-gray-100" : "max-h-0 opacity-0"
          } space-y-3`}
        >
          {menuLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block text-sm font-medium py-1.5 transition-colors ${
                  isActive ? "text-primary-600" : "text-gray-600 hover:text-primary-500"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          {user ? (
            <>
              {user.role === "admin" && (
                <NavLink
                  to="/admin/dashboard"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block text-sm font-medium py-1.5 transition-colors ${
                      isActive ? "text-primary-600" : "text-gray-600 hover:text-primary-500"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              )}
              <button
                onClick={handleLogout}
                className="block text-red-500 text-sm font-medium py-1.5 hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="block text-primary-500 text-sm font-medium py-1.5 hover:text-primary-600 transition-colors"
            >
              Sign up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
