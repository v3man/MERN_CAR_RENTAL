import { useState } from "react";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import api from "../api/axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/messages", formData);
      toast.success(data.message || "Thank you for contacting us!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Contact submit error:", error);
      toast.error(error.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Have questions about our car rental services? Need help with an existing booking? Our team is available 24/7 to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Details */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                <img src={assets.location_icon_colored} alt="Location" className="w-5 h-5 opacity-80" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Our Headquarters</h3>
                <p className="text-gray-500 text-sm">B wing, Bandra Kurla Complex,<br />Bandra East, Mumbai 400051.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                <img src={assets.gmail_logo} alt="Email" className="w-5 h-5 opacity-80" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                <p className="text-gray-500 text-sm">support@firstclassrentals.com<br />bookings@firstclassrentals.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                 {/* Using check_icon as a placeholder for phone since there isn't a phone icon */}
                <img src={assets.check_icon} alt="Phone" className="w-5 h-5 opacity-80" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                <p className="text-gray-500 text-sm">+91 70451 67890<br />Mon-Fri from 8am to 8pm</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex justify-center items-center hover:bg-gray-50 transition-colors">
                   <img src={assets.facebook_logo} alt="Facebook" className="w-4 h-4 opacity-60" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex justify-center items-center hover:bg-gray-50 transition-colors">
                   <img src={assets.twitter_logo} alt="Twitter" className="w-4 h-4 opacity-60" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex justify-center items-center hover:bg-gray-50 transition-colors">
                   <img src={assets.instagram_logo} alt="Instagram" className="w-4 h-4 opacity-60" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Provide detailed information about your inquiry..."
                  required
                  className="input-field resize-none rounded-xl"
                ></textarea>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full mt-2 disabled:opacity-50">
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
