//src/pages/auth/LoginPage.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../components/api/client";
import AuthLayout from "./AuthLayout";

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [view, setView] = useState("login");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const handleChange = (event) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please enter campus email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/api/auth/login/", {
        username: formData.email,
        password: formData.password,
      });

      const { token, user } = res.data;
      localStorage.setItem("campverse_token", token);
      localStorage.setItem("campverse_user", JSON.stringify(user));
      onLogin?.(user.username || user.email);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill all fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/api/auth/register/", {
        username: formData.name.replace(/\s+/g, "_").toLowerCase(),
        email: formData.email,
        password: formData.password,
        password_confirm: formData.confirmPassword,
        first_name: formData.name.split(" ")[0],
        last_name: formData.name.split(" ").slice(1).join(" ") || "",
      });

      const { token, user } = res.data;
      localStorage.setItem("campverse_token", token);
      localStorage.setItem("campverse_user", JSON.stringify(user));
      onLogin?.(user.username || user.email);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    if (!formData.email) {
      alert("Please enter your campus email");
      return;

    }
    alert(`Password reset link sent to ${formData.email}`);
    setView("login");
  };

  const fieldClass =
    "w-full px-4 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-sky-500 focus:outline-none transition text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800";

  return (
    <AuthLayout
      title={view === "signup" ? "Create Campverse account" : view === "forgot" ? "Reset Campverse password" : "Sign in to Campverse"}
      subtitle={view === "signup"
        ? "Join your campus community in a single step."
        : view === "forgot"
          ? "Enter your campus email to receive a reset link."
          : "Use your campus email to access all Campverse modules."}
    >
      {view === "login" && (
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Campus Email</label>
            <input name="email" value={formData.email} onChange={handleChange} type="email" className={fieldClass} placeholder="you@college.edu" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Password</label>
            <div className="relative">
              <input name="password" value={formData.password} onChange={handleChange} type={showPassword ? "text" : "password"} className={`${fieldClass} pr-12`} placeholder="••••••••" required />
              <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-4 top-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl text-white font-bold transition-all shadow-lg hover:shadow-xl ${loading ? "bg-slate-400 cursor-not-allowed" : "bg-gradient-to-r from-sky-600 to-indigo-500 hover:from-sky-700 hover:to-indigo-600"}`}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <div className="mt-6 space-y-4 text-center">
            <button type="button" onClick={() => setView("forgot")} className="text-sm text-sky-500 hover:text-sky-600 font-medium dark:text-sky-400 dark:hover:text-sky-300">
              Forgot password?
            </button>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <button type="button" onClick={() => setView("signup")} className="text-sm text-slate-600 hover:text-slate-900 font-medium dark:text-slate-300 dark:hover:text-slate-100">
                Don&apos;t have an account? <span className="text-sky-500 font-semibold dark:text-sky-400">Create one</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {view === "signup" && (
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Full Name</label>
            <input name="name" value={formData.name} onChange={handleChange} type="text" className={fieldClass} placeholder="John Doe" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Campus Email</label>
            <input name="email" value={formData.email} onChange={handleChange} type="email" className={fieldClass} placeholder="you@college.edu" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Password</label>
            <input name="password" value={formData.password} onChange={handleChange} type={showPassword ? "text" : "password"} className={fieldClass} placeholder="••••••••" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Confirm Password</label>
            <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type={showPassword ? "text" : "password"} className={fieldClass} placeholder="••••••••" required />
          </div>
          <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl text-white font-bold transition-all shadow-lg hover:shadow-xl ${loading ? "bg-slate-400 cursor-not-allowed" : "bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600"}`}>
            {loading ? "Creating account..." : "Create Campverse Account"}
          </button>
          <div className="mt-6 text-center">
            <button type="button" onClick={() => setView("login")} className="text-sm text-slate-600 hover:text-slate-900 font-medium dark:text-slate-300 dark:hover:text-slate-100">
              Already have an account? <span className="text-sky-500 font-semibold dark:text-sky-400">Sign in</span>
            </button>
          </div>
        </form>
      )}

      {view === "forgot" && (
        <form onSubmit={handleForgotPassword} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Campus Email</label>
            <input name="email" value={formData.email} onChange={handleChange} type="email" className={fieldClass} placeholder="you@college.edu" required />
          </div>
          <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-500 text-white font-bold hover:from-sky-700 hover:to-indigo-600 transition-all shadow-lg">
            Send reset link
          </button>
          <div className="text-center">
            <button type="button" onClick={() => setView("login")} className="text-sm text-slate-600 hover:text-slate-900 font-medium dark:text-slate-300 dark:hover:text-slate-100">
              Back to login
            </button>
          </div>
        </form>
      )}

      <p className="mt-6 text-[11px] text-slate-400 text-center">
        © {new Date().getFullYear()} Campverse
      </p>
    </AuthLayout>
  );
};

export default LoginPage;