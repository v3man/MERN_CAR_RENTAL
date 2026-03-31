import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img src={assets.logo} alt="CarRental" className="h-7 mb-4" />
            <p className="text-gray-500 text-sm leading-relaxed">
              Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="opacity-50 hover:opacity-80 transition-opacity">
                <img src={assets.facebook_logo} alt="Facebook" className="w-5 h-5" />
              </a>
              <a href="#" className="opacity-50 hover:opacity-80 transition-opacity">
                <img src={assets.instagram_logo} alt="Instagram" className="w-5 h-5" />
              </a>
              <a href="#" className="opacity-50 hover:opacity-80 transition-opacity">
                <img src={assets.twitter_logo} alt="Twitter" className="w-5 h-5" />
              </a>
              <a href="#" className="opacity-50 hover:opacity-80 transition-opacity">
                <img src={assets.gmail_logo} alt="Email" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Quick Links</h4>
            <div className="space-y-2.5">
              <Link to="/" className="block text-gray-500 hover:text-gray-700 text-sm transition-colors">Home</Link>
              <Link to="/cars" className="block text-gray-500 hover:text-gray-700 text-sm transition-colors">Browse Cars</Link>
              <Link to="/my-bookings" className="block text-gray-500 hover:text-gray-700 text-sm transition-colors">List Your Car</Link>
              <Link to="/" className="block text-gray-500 hover:text-gray-700 text-sm transition-colors">About Us</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Contact</h4>
            <div className="space-y-2.5 text-sm text-gray-500">
              <p>B wing, Bandra Kurla Complex,</p>
              <p>Bandra East, Mumbai 400051.</p>
              <p>+91 70451 67890</p>
              <p>supportcar@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} CarRental. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
