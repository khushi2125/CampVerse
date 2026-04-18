//src/pages/auth/ForgotPassword.jsx
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";

const ForgotPassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // yahan password reset email API
  };
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your college email and we'll send you reset instructions."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-300">
            College Email
          </label>
          <input
            type="email"
            required
            placeholder="you@college.edu"
            className="
              w-full px-3 py-2.5 text-sm rounded-xl 
              bg-slate-900 border border-slate-700 
              text-slate-100 placeholder:text-slate-500
              focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500
            "
          />
        </div>

        <button
          type="submit"
          className="
            w-full py-2.5 rounded-xl 
            bg-gradient-to-r from-purple-500 via-indigo-500 to-sky-500 
            text-sm font-semibold text-white
            shadow-[0_14px_45px_rgba(129,140,248,0.6)]
            transition-all duration-300
            hover:shadow-[0_18px_55px_rgba(59,130,246,0.8)]
            hover:translate-y-0.5
          "
        >
          Send reset link
        </button>

        <p className="text-[11px] text-slate-400 text-center">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-sky-400 hover:text-sky-300 font-medium"
          >
            Back to login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
