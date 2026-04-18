// src/pages/auth/Register.jsx
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // yahan signup API call
  };

  return (
    <AuthLayout
      title="Create your campus account"
      subtitle="Use your official college email to sign up."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rohan Sharma"
              className="
                w-full px-3 py-2.5 text-sm rounded-xl 
                bg-slate-900 border border-slate-700 
                text-slate-100 placeholder:text-slate-500
                focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500
              "
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Roll / ID
            </label>
            <input
              type="text"
              required
              placeholder="e.g. CSE-21-045"
              className="
                w-full px-3 py-2.5 text-sm rounded-xl 
                bg-slate-900 border border-slate-700 
                text-slate-100 placeholder:text-slate-500
                focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500
              "
            />
          </div>
        </div>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="Create a strong password"
              className="
                w-full px-3 py-2.5 text-sm rounded-xl 
                bg-slate-900 border border-slate-700 
                text-slate-100 placeholder:text-slate-500
                focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500
              "
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Confirm Password
            </label>
            <input
              type="password"
              required
              placeholder="Repeat password"
              className="
                w-full px-3 py-2.5 text-sm rounded-xl 
                bg-slate-900 border border-slate-700 
                text-slate-100 placeholder:text-slate-500
                focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500
              "
            />
          </div>
        </div>

        <div className="flex items-start gap-2 text-[11px] text-slate-400">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-3.5 w-3.5 rounded border-slate-600 bg-slate-900"
          />
          <span>
            I agree to the campus usage policy and data guidelines.
          </span>
        </div>

        <button
          type="submit"
          className="
            w-full py-2.5 rounded-xl 
            bg-gradient-to-r from-emerald-400 via-sky-500 to-indigo-500 
            text-sm font-semibold text-slate-950
            shadow-[0_14px_45px_rgba(45,212,191,0.45)]
            transition-all duration-300
            hover:shadow-[0_18px_55px_rgba(56,189,248,0.65)]
            hover:translate-y-0.5
          "
        >
          Create account
        </button>

        <p className="text-[11px] text-slate-400 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-sky-400 hover:text-sky-300 font-medium"
          >
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
