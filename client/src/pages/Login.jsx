import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(email, password);
      toast.success(`Welcome back, ${data.user.name}!`);
      navigate(data.user.role === "admin" ? "/admin/dashboard" : "/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src={assets.logo} alt="CarRental" className="h-7 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input
              id="login-email" type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <input
                id="login-password" type={showPw ? "text" : "password"} required
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" className="input-field pr-10"
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2">
                <img src={showPw ? assets.eye_close_icon : assets.eye_icon} alt=""
                  className="w-4.5 h-4.5 opacity-40 hover:opacity-60 transition-opacity" />
              </button>
            </div>
          </div>

          <button id="login-submit" type="submit" disabled={loading}
            className="w-full btn-primary py-3 disabled:opacity-50">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary-500 hover:text-primary-600 font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
