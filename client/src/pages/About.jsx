import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50/60 to-white pt-16 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About CarRental</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            We're on a mission to make luxury car rentals accessible, seamless, and enjoyable for everyone.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Founded with a passion for automobiles and exceptional service, CarRental has grown from a small fleet into one of the most trusted premium car rental platforms. We believe every journey should feel special — whether it's a weekend getaway, a business trip, or an unforgettable road trip.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our carefully curated fleet includes everything from sporty sedans to rugged SUVs, all meticulously maintained and ready for your next adventure. We partner with leading insurance providers to ensure your peace of mind on every ride.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden bg-gray-100">
            <img src={assets.banner_car_image} alt="Our fleet" className="w-full h-72 object-cover" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-gray-50/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "500+", label: "Cars Available" },
              { value: "10K+", label: "Happy Customers" },
              { value: "50+", label: "Cities Covered" },
              { value: "24/7", label: "Customer Support" },
            ].map((stat, i) => (
              <div key={i} className="card p-6">
                <div className="text-3xl font-bold text-primary-500 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Why Choose CarRental?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: assets.car_icon,
                title: "Premium Fleet",
                desc: "Hand-picked luxury and everyday vehicles, all regularly serviced and sanitized for your comfort.",
              },
              {
                icon: assets.location_icon,
                title: "Flexible Locations",
                desc: "Pick up and drop off at convenient locations across major cities. Airport transfers available.",
              },
              {
                icon: assets.tick_icon,
                title: "Easy Booking",
                desc: "Book your dream car in under 2 minutes. No paperwork hassles, no hidden fees, instant confirmation.",
              },
            ].map((item, i) => (
              <div key={i} className="card p-6 text-center">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <img src={item.icon} alt="" className="w-6 h-6 opacity-60" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to Hit the Road?</h2>
          <p className="text-gray-500 mb-6">Browse our collection of premium vehicles and book your perfect ride today.</p>
          <Link to="/cars" className="btn-primary inline-flex items-center gap-2">
            Browse Cars
            <img src={assets.arrow_icon} alt="" className="w-3.5 h-3.5 invert" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
