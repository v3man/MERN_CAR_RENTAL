import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets/assets";

const Support = () => {
  const faqs = [
    {
      question: "How do I book a car?",
      answer: "You can book a car by browsing our selection on the 'Cars' page, selecting a vehicle, and providing your pickup and return dates.",
    },
    {
      question: "What documents do I need?",
      answer: "You will need a valid driver's license, a credit card for the security deposit, and a form of identification (ID or Passport).",
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking up to 24 hours before the pickup time for a full refund. Visit 'My Bookings' to manage your reservations.",
    },
    {
      question: "Is insurance included?",
      answer: "Basic insurance is included with all rentals. You can opt for additional premium coverage during the booking process.",
    },
  ];

  return (
    <div className="pt-24 pb-20 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Support Center</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Need help with your rental? Find answers to frequently asked questions or contact our support team directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* FAQ Section */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="grid gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-8">
            <div className="bg-primary-50 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Direct Support</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <img src={assets.gmail_logo} alt="Email" className="w-4 h-4 opacity-70" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">Email Us</h3>
                    <p className="text-gray-500 text-xs mt-1 text-wrap">supportcar@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <img src={assets.check_icon} alt="Phone" className="w-4 h-4 opacity-70" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">Phone Support</h3>
                    <p className="text-gray-500 text-xs mt-1">+91 70451 67890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <img src={assets.location_icon_colored} alt="Office" className="w-4 h-4 opacity-70" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">Main Office</h3>
                    <p className="text-gray-500 text-xs mt-1">B wing, Bandra Kurla Complex, Bandra East, Mumbai 400051.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-primary-100">
                <p className="text-sm text-gray-600 mb-4">Can't find what you're looking for?</p>
                <Link to="/contact" className="btn-primary w-full text-center py-2 text-sm inline-block">
                  Send us a Message
                </Link>
              </div>
            </div>

            {/* Help Categories */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-gray-100 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Billing</div>
                <div className="text-[10px] text-gray-400">Payment help</div>
              </div>
              <div className="p-4 rounded-xl border border-gray-100 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Claims</div>
                <div className="text-[10px] text-gray-400">Accident support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
