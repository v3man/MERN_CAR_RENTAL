import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLayout from "./components/AdminLayout";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CarDetail from "./pages/CarDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyBookings from "./pages/MyBookings";
import Dashboard from "./pages/admin/Dashboard";
import AddCar from "./pages/admin/AddCar";
import ManageCars from "./pages/admin/ManageCars";
import ManageBookings from "./pages/admin/ManageBookings";
import Support from "./pages/admin/Support";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-1">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/cars/:id" element={<CarDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* User routes */}
              <Route path="/my-bookings" element={
                <ProtectedRoute><MyBookings /></ProtectedRoute>
              } />

              {/* Admin routes */}
              <Route path="/admin" element={
                <ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>
              }>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="add-car" element={<AddCar />} />
                <Route path="cars" element={<ManageCars />} />
                <Route path="bookings" element={<ManageBookings />} />
                <Route path="support" element={<Support />} />
              </Route>
            </Routes>
          </main>

          <Footer />
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#1f2937',
              borderRadius: '10px',
              border: '1px solid #e5e7eb',
              fontSize: '14px',
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
