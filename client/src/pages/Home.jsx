import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { assets, cityList, dummyCarData } from "../assets/assets";
import api from "../api/axios";
import CarCard from "../components/CarCard";
import { cn } from "../lib/utils";
import { AnimatedGridPattern } from "../components/ui/AnimatedGridPattern";

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get("/cars?limit=3");
        setFeaturedCars(data.cars);
      } catch {
        // Use dummy data as fallback
        setFeaturedCars(dummyCarData.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const useScrollAnimation = () => {
    const ref = useRef(null);
    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      }, observerOptions);

      if (ref.current) observer.observe(ref.current);
      return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);
    return ref;
  };

  const heroRef = useScrollAnimation();
  const featuredRef = useScrollAnimation();
  const bannerRef = useScrollAnimation();
  const testimonialRef = useScrollAnimation();
  const newsletterRef = useScrollAnimation();

  const testimonials = [
    {
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_1,
      text: "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that CarRental provides.",
    },
    {
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_2,
      text: "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that CarRental provides.",
    },
    {
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_1,
      text: "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that CarRental provides.",
    },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Global Animated Grid behind everything */}
      <AnimatedGridPattern
        numSquares={60}
        maxOpacity={0.12}
        duration={3}
        repeatDelay={0.5}
        className={cn(
          "inset-x-0 inset-y-0 h-full w-full",
          "[mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,white_60%,transparent_100%)]"
        )}
      />

      {/* Page Content Container */}
      <div className="relative z-10">
        {/* Hero */}
        <section ref={heroRef} className="bg-gradient-to-b from-primary-50/60 to-white pt-16 pb-24 opacity-0">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 mt-8">
              Luxury Cars on Rent
            </h1>

            {/* Search bar */}
            <div className="inline-flex items-center bg-white rounded-full shadow-md border border-gray-100 pl-6 pr-2 py-2 gap-4 mb-12">
              <div className="text-left">
                <div className="text-xs text-gray-400 font-medium">Pickup Location</div>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="text-sm text-gray-700 bg-transparent focus:outline-none font-medium min-w-[120px]"
                >
                  <option value="">Select City</option>
                  {cityList.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="text-left">
                <div className="text-xs text-gray-400 font-medium">Pick-up Date</div>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="text-sm text-gray-700 bg-transparent focus:outline-none font-medium"
                />
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="text-left">
                <div className="text-xs text-gray-400 font-medium">Return Date</div>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="text-sm text-gray-700 bg-transparent focus:outline-none font-medium"
                />
              </div>
              <Link
                to={`/cars?location=${location}&pickupDate=${pickupDate}&returnDate=${returnDate}`}
                className="ml-2 bg-primary-500 hover:bg-primary-600 text-white rounded-full px-5 py-2.5 text-sm font-medium flex items-center gap-2 transition-colors"
              >
                <img src={assets.search_icon} alt="" className="w-4 h-4 invert" />
                Search
              </Link>
            </div>

            {/* Full-width Animated Hero car image */}
            <div className="relative w-full" style={{ height: "320px", overflow: "visible" }}>
              <motion.img
                src={assets.main_car}
                alt="Car"
                className="drop-shadow-xl"
                style={{
                  width: "520px",
                  position: "absolute",
                  left: "calc(50% - 260px)", // true center: 50% minus half of 520px width
                  top: 0,
                }}
                initial={{ x: "100vw" }}
                animate={{
                  x: ["100vw", "0px", "0px", "-150vw"],
                }}
                transition={{
                  duration: 6,
                  times: [0, 0.3, 0.65, 1],
                  ease: ["easeOut", "linear", "easeIn", "easeIn"],
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              />
            </div>
          </div>
        </section>

      {/* Featured Vehicles */}
      <section ref={featuredRef} className="py-20 px-4 opacity-0 transition-opacity duration-1000">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Featured Vehicles</h2>
            <p className="text-gray-500">Explore our selection of premium vehicles available for your next adventure.</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card h-72 animate-pulse bg-gray-50"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCars.map((car, i) => (
                <CarCard key={car._id || i} car={car} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/cars" className="btn-outline inline-flex items-center gap-2">
              Explore all cars
              <img src={assets.arrow_icon} alt="" className="w-3.5 h-3.5 opacity-50" />
            </Link>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section ref={bannerRef} className="py-12 px-4 opacity-0 transition-opacity duration-1000">
        <div className="max-w-7xl mx-auto">
          <div className="bg-primary-500 rounded-2xl overflow-hidden flex flex-col md:flex-row items-center px-10 md:px-16 py-10 gap-8">
            <div className="flex-1 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Do You Own a Luxury Car?</h2>
              <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-md">
                Monetize your vehicle effortlessly by listing it on CarRental. We take care of insurance, driver verification, and secure payments — so you can earn passive income, stress-free.
              </p>
              <Link to="/signup" className="inline-block bg-white text-primary-500 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                List your car
              </Link>
            </div>
            <div className="flex-shrink-0">
              <img src={assets.banner_car_image} alt="" className="w-72 md:w-80 drop-shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialRef} className="py-20 px-4 opacity-0 transition-opacity duration-1000">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What Our Customers Say</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Discover why discerning travelers choose StayVenture for their luxury accommodations around the world.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <img src={t.image} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.location}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <img key={s} src={assets.star_icon} alt="" className="w-4 h-4" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section ref={newsletterRef} className="py-20 px-4 opacity-0 transition-opacity duration-1000">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Never Miss a Deal!</h2>
          <p className="text-gray-500 mb-8">Subscribe to get the latest offers, new collections, and exclusive discounts.</p>
          <form className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="input-field flex-1"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe Now
            </button>
          </form>
        </div>
      </section>
    </div>
  </div>
  );
};

export default Home;
