
// //src/pages/auth/Login.jsx
import React, { useState, useEffect } from "react";
import api from "../../components/api/client";
import { useNavigate } from 'react-router-dom';



const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [view, setView] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // TODO: yaha baad me axios se real backend connect karna


//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (formData.email && formData.password) {
//       const storedUsers = JSON.parse(localStorage.getItem("users") || "{}");
//       const user = storedUsers[formData.email];


//       if (user && user.password === formData.password) {
//         onLogin?.(user.name || formData.email);
//       } else {
//         alert("Invalid campus email or password");
//       }
//     } else {
//       alert("Please enter campus email and password");
//     }
//   };
   const handleLogin = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    alert("Please enter campus email and password");
    return;
  }

  try {
    const res = await api.post("/api/auth/login/", {
      username: formData.email,
      password: formData.password,
    });

    // backend se: { token, user: {id, email, username, role, ...} } aa raha hai [file:2]
    const { token, user } = res.data;

    localStorage.setItem("campverse_token", token);
    localStorage.setItem("campverse_user", JSON.stringify(user));

    onLogin?.(user.username || user.email);

    navigate("/dashboard");
  } catch (err) {
    console.error(err);
    alert("Invalid credentials or server error");
  }
};


  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (formData.email) {
      alert("Password reset link sent to " + formData.email);
      setView("login");
    } else {
      alert("Please enter your campus email");
    }
  };


  const handleSignup = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
    alert("Please fill all fields");
    return;
  }
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await api.post("/api/auth/register/", {
      username: formData.name.replace(/\s+/g, '_').toLowerCase(),
      email: formData.email,
      password: formData.password,
      password_confirm: formData.confirmPassword,
      first_name: formData.name.split(' ')[0],
      last_name: formData.name.split(' ').slice(1).join(' ') || '',
    });

    const { token, user } = res.data;

    localStorage.setItem("campverse_token", token);
    localStorage.setItem("campverse_user", JSON.stringify(user));

    alert("Campverse account created!");
    navigate("/dashboard");
  } catch (err) {
    console.error(err);
    alert("Registration failed");
  }
};



  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Left Panel - Campverse intro */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-sky-500 via-indigo-600 to-emerald-500 relative overflow-hidden">
        {/* Animated floating bubbles */}
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
        <div className="bubble bubble-5"></div>
        <div className="bubble bubble-6"></div>


        <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
          <div className="mb-8">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-6 shadow-xl border border-white/30">
              {/* Campverse style icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7l9-4 9 4-9 4-9-4z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10l9 4 9-4V7"
                />
              </svg>
            </div>
            <p className="text-sm uppercase tracking-[0.25em] text-sky-100/80 mb-2">
              Your Campus, Connected
            </p>
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Welcome to Campverse
            </h1>
            <p className="text-xl text-sky-50/90 leading-relaxed">
              Manage lost items, notices, marketplace, feedback and campus
              records from one powerful dashboard.
            </p>
          </div>


          <div className="space-y-5 mt-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-lg">
                Find and claim lost items in minutes
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-lg">
                Never miss events with smart notice boards
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-lg">
                Buy, sell &amp; share inside your campus community
              </span>
            </div>
          </div>
        </div>


        {/* Bubbles CSS */}
        <style>{`
          .bubble {
            position: absolute;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            animation: float 20s infinite ease-in-out;
          }
          
          .bubble-1 {
            width: 80px;
            height: 80px;
            top: 10%;
            left: 10%;
            animation-duration: 15s;
            animation-delay: 0s;
          }
          
          .bubble-2 {
            width: 120px;
            height: 120px;
            top: 60%;
            left: 70%;
            animation-duration: 20s;
            animation-delay: 2s;
          }
          
          .bubble-3 {
            width: 60px;
            height: 60px;
            top: 30%;
            left: 80%;
            animation-duration: 18s;
            animation-delay: 4s;
          }
          
          .bubble-4 {
            width: 100px;
            height: 100px;
            top: 80%;
            left: 20%;
            animation-duration: 22s;
            animation-delay: 1s;
          }
          
          .bubble-5 {
            width: 70px;
            height: 70px;
            top: 50%;
            left: 40%;
            animation-duration: 17s;
            animation-delay: 3s;
          }
          
          .bubble-6 {
            width: 90px;
            height: 90px;
            top: 15%;
            left: 50%;
            animation-duration: 19s;
            animation-delay: 5s;
          }
          
          @keyframes float {
            0%, 100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.7;
            }
            25% {
              transform: translate(20px, -30px) scale(1.1);
              opacity: 0.9;
            }
            50% {
              transform: translate(-15px, -60px) scale(0.95);
              opacity: 0.6;
            }
            75% {
              transform: translate(25px, -40px) scale(1.05);
              opacity: 0.8;
            }
          }
        `}</style>
      </div>


      {/* Right Side - Forms (login / forgot / signup switch) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="w-full max-w-md">
          {/* LOGIN */}
          {view === "login" && (
            <div className="bg-white rounded-3xl shadow-2xl p-10 transform transition-all duration-500">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl dark:shadow-[0_24px_60px_rgba(0,0,0,0.35)] p-10 transform transition-all duration-500 border border-transparent dark:border-slate-700">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-50 mb-2">
                  Sign in to Campverse
                </h2>
                <p className="text-slate-500">
                <p className="text-slate-500 dark:text-slate-300">
                  Use your campus email to access all Campverse modules.
                </p>
              </div>


              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                    Campus Email
                  </label>
                  <div className="relative">
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition text-slate-800 bg-slate-50"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-sky-500 focus:outline-none transition text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800"
                      placeholder="you@college.edu"
                    />
                    <span className="absolute left-4 top-4 text-slate-400">
                    <span className="absolute left-4 top-4 text-slate-400 dark:text-slate-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </span>
                  </div>
                </div>


                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition text-slate-800 bg-slate-50"
                      className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-sky-500 focus:outline-none transition text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800"
                      placeholder="••••••••"
                    />
                    <span className="absolute left-4 top-4 text-slate-400 dark:text-slate-500">
                    <span className="absolute left-4 top-4 text-slate-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
                      className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                  className="text-sm text-sky-500 hover:text-sky-600 font-medium dark:text-sky-400 dark:hover:text-sky-300"
                  className="text-sm text-slate-600 hover:text-slate-900 font-medium dark:text-slate-300 dark:hover:text-slate-100"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>


                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-500 text-white font-bold hover:from-sky-700 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Sign in
                </button>
              </form>


              <div className="mt-8 space-y-4">
                <div className="w-full text-center text-amber-600 text-sm font-semibold">
                  Forgot your password? Uh-oh, looks like someone needs a memory upgrade! 🤔💾
                </div>
                <div className="text-center text-slate-600">
                  New to Campverse?{" "}
                  <button
                    onClick={() => setView("signup")}
                    className="text-sky-600 hover:text-sky-700 font-semibold"
                  >
                    Create account
                  </button>
                </div>
              </div>
            </div>
          )}


          {/* FORGOT PASSWORD */}
          {view === "forgot" && (
            <div className="bg-white rounded-3xl shadow-2xl p-10">
              <button
                onClick={() => setView("login")}
                className="text-slate-600 hover:text-slate-800 mb-6 flex items-center font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to login
              </button>


              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                  Reset Campverse password
                </h2>
                <p className="text-slate-500">
                  Enter your campus email to receive a reset link.
                </p>
              </div>


              <form onSubmit={handleForgotPassword} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Campus Email
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition text-slate-800 bg-slate-50"
                    placeholder="you@college.edu"
                  />
                </div>


                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-500 text-white font-bold hover:from-sky-700 hover:to-indigo-600 transition-all shadow-lg"
                >
                  Send reset link
                </button>
              </form>
            </div>
          )}


          {/* SIGNUP */}
          {view === "signup" && (
            <div className="bg-white rounded-3xl shadow-2xl p-10">
              <button
                onClick={() => setView("login")}
                className="text-slate-600 hover:text-slate-800 mb-6 flex items-center font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to login
              </button>


              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                  Create your Campverse account
                </h2>
                <p className="text-slate-500">
                  Join your campus community in a single connected space.
                </p>
              </div>


              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition text-slate-800 bg-slate-50"
                    placeholder="John Doe"
                  />
                </div>


                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Campus Email
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition text-slate-800 bg-slate-50"
                    placeholder="you@college.edu"
                  />
                </div>


                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Password
                  </label>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition text-slate-800 bg-slate-50"
                    placeholder="••••••••"
                  />
                </div>


                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Confirm password
                  </label>
                  <input
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    type="password"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition text-slate-800 bg-slate-50"
                    placeholder="••••••••"
                  />
                </div>


                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-bold hover:from-emerald-600 hover:to-sky-600 transition-all shadow-lg mt-2"
                >
                  Create Campverse account
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default LoginPage;   



// // src/pages/auth/Login.jsx

// import React, { useState, useEffect } from "react";
// import api from "../../api/client"; // path dhyaan se: src/api/client.js

// const LoginPage = ({ onLogin }) => {
//   const [view, setView] = useState("login");
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     name: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const link = document.createElement("link");
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
//     link.rel = "stylesheet";
//     document.head.appendChild(link);
//   }, []);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   // LOGIN -> backend POST /api/accounts/login/
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!formData.email || !formData.password) {
//       alert("Please enter campus email and password");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await api.post("/api/accounts/login/", {
//         email: formData.email,
//         password: formData.password,
//       });

//       // backend response: { token, user: {...} }
//       const { token, user } = res.data;

//       localStorage.setItem("campverse_token", token);
//       localStorage.setItem("campverse_user", JSON.stringify(user));

//       if (onLogin) {
//         onLogin(user.username || user.email);
//       }
//       alert("Login successful!");
//     } catch (err) {
//       console.error(err);
//       alert("Invalid campus email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // SIGNUP -> backend POST /api/accounts/register/
//   const handleSignup = async (e) => {
//     e.preventDefault();

//     if (
//       !formData.name ||
//       !formData.email ||
//       !formData.password ||
//       !formData.confirmPassword
//     ) {
//       alert("Please fill all fields");
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Tumhara backend ka UserSerializer ye fields leta hai:
//       // ['id', 'username', 'email', 'role', 'roll_no', 'phone'][file:2]
//       const res = await api.post("/api/accounts/register/", {
//         username: formData.name,
//         email: formData.email,
//         password: formData.password,
//         role: "student", // default
//         roll_no: "",
//         phone: "",
//       });

//       const { token, user } = res.data;

//       localStorage.setItem("campverse_token", token);
//       localStorage.setItem("campverse_user", JSON.stringify(user));

//       alert("Campverse account created! You are now logged in.");
//       setView("login");
//       setFormData((prev) => ({
//         ...prev,
//         password: "",
//         confirmPassword: "",
//       }));
//     } catch (err) {
//       console.error(err);
//       alert("Error while creating account (maybe email already exists).");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleForgotPassword = (e) => {
//     e.preventDefault();
//     if (formData.email) {
//       // Abhi backend me reset API nahi hai, isliye UI only.
//       alert("Password reset link (dummy) sent to " + formData.email);
//       setView("login");
//     } else {
//       alert("Please enter your campus email");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex"
//       style={{ fontFamily: "'Poppins', sans-serif" }}
//     >
//       {/* Left animated panel same as pehle (shortened yaha) */}
//        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-sky-500 via-indigo-600 to-emerald-500 relative overflow-hidden">
//         {/* Animated floating bubbles */}
//        <div className="bubble bubble-1"></div>
//        <div className="bubble bubble-2"></div>
//          <div className="bubble bubble-3"></div>
//         <div className="bubble bubble-4"></div>
//          <div className="bubble bubble-5"></div>
//          <div className="bubble bubble-6"></div>


//          <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
//           <div className="mb-8">
//             <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-6 shadow-xl border border-white/30">
//               {/* Campverse style icon */}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-10 w-10"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 7l9-4 9 4-9 4-9-4z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 7v10l9 4 9-4V7"
//                 />
//               </svg>
//             </div>
//             <p className="text-sm uppercase tracking-[0.25em] text-sky-100/80 mb-2">
//               Your Campus, Connected
//             </p>
//             <h1 className="text-5xl font-bold mb-4 leading-tight">
//               Welcome to Campverse
//             </h1>
//             <p className="text-xl text-sky-50/90 leading-relaxed">
//               Manage lost items, notices, marketplace, feedback and campus
//               records from one powerful dashboard.
//             </p>
//           </div>


//           <div className="space-y-5 mt-8">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               </div>
//               <span className="text-lg">
//                 Find and claim lost items in minutes
//               </span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               </div>
//               <span className="text-lg">
//                 Never miss events with smart notice boards
//               </span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               </div>
//               <span className="text-lg">
//                 Buy, sell &amp; share inside your campus community
//               </span>
//             </div>
//           </div>
//         </div>


//         {/* Bubbles CSS */}
//         <style>{`
//           .bubble {
//             position: absolute;
//             background: rgba(255, 255, 255, 0.15);
//             backdrop-filter: blur(10px);
//             border: 1px solid rgba(255, 255, 255, 0.2);
//             border-radius: 50%;
//             animation: float 20s infinite ease-in-out;
//           }
//           
//           .bubble-1 {
//             width: 80px;
//             height: 80px;
//             top: 10%;
//             left: 10%;
//             animation-duration: 15s;
//             animation-delay: 0s;
//           }
//           
//           .bubble-2 {
//             width: 120px;
//             height: 120px;
//             top: 60%;
//             left: 70%;
//             animation-duration: 20s;
//             animation-delay: 2s;
//           }
//           
//           .bubble-3 {
//             width: 60px;
//             height: 60px;
//             top: 30%;
//             left: 80%;
//             animation-duration: 18s;
//             animation-delay: 4s;
//           }
//           
//           .bubble-4 {
//             width: 100px;
//             height: 100px;
//             top: 80%;
//             left: 20%;
//             animation-duration: 22s;
//             animation-delay: 1s;
//           }
//           
//           .bubble-5 {
//             width: 70px;
//             height: 70px;
//             top: 50%;
//             left: 40%;
//             animation-duration: 17s;
//             animation-delay: 3s;
//           }
//           
//           .bubble-6 {
//             width: 90px;
//             height: 90px;
//             top: 15%;
//             left: 50%;
//             animation-duration: 19s;
//             animation-delay: 5s;
//           }
//           
//           @keyframes float {
//             0%, 100% {
//               transform: translate(0, 0) scale(1);
//               opacity: 0.7;
//             }
//             25% {
//               transform: translate(20px, -30px) scale(1.1);
//               opacity: 0.9;
//             }
//             50% {
//               transform: translate(-15px, -60px) scale(0.95);
//               opacity: 0.6;
//             }
//             75% {
//               transform: translate(25px, -40px) scale(1.05);
//               opacity: 0.8;
//             }
//           }
//         `}</style>
//       </div>
//       {/* ... tumhara pura left panel wala JSX jaisa file me hai, use as-is rakhna ... */}

//       {/* Right Side - Forms (login / forgot / signup switch) */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
//         <div className="w-full max-w-md">
//           {/* LOGIN */}
//           {view === "login" && (
//             <div className="bg-white rounded-3xl shadow-2xl p-10 transform transition-all duration-500">
//               <div className="text-center mb-8">
//                 <h2 className="text-3xl font-bold text-slate-800 mb-2">
//                   Sign in to Campverse
//                 </h2>
//                 <p className="text-slate-500">
//                   Use your campus email to access all Campverse modules.
//                 </p>
//               </div>

//               <form onSubmit={handleLogin} className="space-y-5">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Campus Email
//                   </label>
//                   <div className="relative">
//                     <input
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       type="email"
//                       className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition text-slate-800 bg-slate-50"
//                       placeholder="you@college.edu"
//                     />
//                     {/* icon same as pehle */}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       type={showPassword ? "text" : "password"}
//                       className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition text-slate-800 bg-slate-50"
//                       placeholder="••••••••"
//                     />
//                     {/* left icon + eye button same as pehle */}
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword((p) => !p)}
//                       className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
//                     >
//                       {showPassword ? "Hide" : "Show"}
//                     </button>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-500 text-white font-bold hover:from-sky-700 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-60"
//                 >
//                   {loading ? "Signing in..." : "Sign in"}
//                 </button>
//               </form>

//               <div className="mt-8 space-y-4">
//                 <button
//                   onClick={() => setView("forgot")}
//                   className="w-full text-sky-600 hover:text-sky-700 font-semibold text-center"
//                 >
//                   Forgot your password?
//                 </button>
//                 <div className="text-center text-slate-600">
//                   New to Campverse?{" "}
//                   <button
//                     onClick={() => setView("signup")}
//                     className="text-sky-600 hover:text-sky-700 font-semibold"
//                   >
//                     Create account
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* FORGOT PASSWORD */}
//           {view === "forgot" && (
//             <div className="bg-white rounded-3xl shadow-2xl p-10">
//               <button
//                 onClick={() => setView("login")}
//                 className="text-slate-600 hover:text-slate-800 mb-6 flex items-center font-semibold"
//               >
//                 Back to login
//               </button>

//               <div className="text-center mb-8">
//                 <h2 className="text-3xl font-bold text-slate-800 mb-2">
//                   Reset Campverse password
//                 </h2>
//                 <p className="text-slate-500">
//                   Enter your campus email to receive a reset link.
//                 </p>
//               </div>

//               <form onSubmit={handleForgotPassword} className="space-y-5">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Campus Email
//                   </label>
//                   <input
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     type="email"
//                     className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition text-slate-800 bg-slate-50"
//                     placeholder="you@college.edu"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-500 text-white font-bold hover:from-sky-700 hover:to-indigo-600 transition-all shadow-lg"
//                 >
//                   Send reset link
//                 </button>
//               </form>
//             </div>
//           )}

//           {/* SIGNUP */}
//           {view === "signup" && (
//             <div className="bg-white rounded-3xl shadow-2xl p-10">
//               <button
//                 onClick={() => setView("login")}
//                 className="text-slate-600 hover:text-slate-800 mb-6 flex items-center font-semibold"
//               >
//                 Back to login
//               </button>

//               <div className="text-center mb-8">
//                 <h2 className="text-3xl font-bold text-slate-800 mb-2">
//                   Create your Campverse account
//                 </h2>
//                 <p className="text-slate-500">
//                   Join your campus community in a single connected space.
//                 </p>
//               </div>

//               <form onSubmit={handleSignup} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Full name
//                   </label>
//                   <input
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     type="text"
//                     className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition text-slate-800 bg-slate-50"
//                     placeholder="John Doe"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Campus Email
//                   </label>
//                   <input
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     type="email"
//                     className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition text-slate-800 bg-slate-50"
//                     placeholder="you@college.edu"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Password
//                   </label>
//                   <input
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     type="password"
//                     className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition text-slate-800 bg-slate-50"
//                     placeholder="••••••••"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Confirm password
//                   </label>
//                   <input
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     type="password"
//                     className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition text-slate-800 bg-slate-50"
//                     placeholder="••••••••"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-bold hover:from-emerald-600 hover:to-sky-600 transition-all shadow-lg mt-2 disabled:opacity-60"
//                 >
//                   {loading ? "Creating account..." : "Create Campverse account"}
//                 </button>
//               </form>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
// // src/pages/auth/Login.jsx
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../../api/client"; // ✅ Backend axios config
// import AuthLayout from "./AuthLayout";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [view, setView] = useState("login");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Google font load
//     const link = document.createElement("link");
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
//     link.rel = "stylesheet";
//     document.head.appendChild(link);
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ LOGIN - Django /api/accounts/login/
//   const handleLogin = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   if (!formData.email || !formData.password) {
//     alert("Please enter campus email and password");
//     setLoading(false);
//     return;
//   }

//   try {
//     const res = await api.post("/api/accounts/login/", {
//       email: formData.email,
//       password: formData.password,
//     });

//     console.log("✅ LOGIN SUCCESS:", res.data); // Debug ke liye

//     const { token, user } = res.data;

//     localStorage.setItem("campverse_token", token);
//     localStorage.setItem("campverse_user", JSON.stringify(user));

//     alert(`Welcome back, ${user.username || user.email}!`);
//     navigate("/"); // Dashboard pe redirect
//   } catch (err) {
//     console.error("❌ LOGIN ERROR:", err.response?.data || err.message);
    
//     // Proper error handling
//     if (err.response?.status === 401) {
//       alert("Invalid credentials. Please check your email and password.");
//     } else if (err.response?.status === 400) {
//       alert("Bad request. Please check your inputs.");
//     } else {
//       alert("Login failed. Server error. Please try again.");
//     }
//   } finally {
//     setLoading(false);
//   }
// };


//   // ✅ REGISTER - Django /api/accounts/register/
//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
//       alert("Please fill all fields");
//       setLoading(false);
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     if (formData.password.length < 6) {
//       alert("Password must be at least 6 characters");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await api.post("/api/accounts/register/", {
//         username: formData.name.trim(),
//         email: formData.email.trim(),
//         password: formData.password,
//         // Optional fields (backend default set karega)
//         role: "student",
//       });

//       const { token, user } = res.data;

//       // Auto login after registration
//       localStorage.setItem("campverse_token", token);
//       localStorage.setItem("campverse_user", JSON.stringify(user));

//       alert("Campverse account created successfully! Welcome aboard!");
//       navigate("/");
//     } catch (err) {
//       console.error("REGISTER ERROR:", err.response?.data || err.message);
      
//       // Django validation errors handle karo
//       const errors = err.response?.data;
//       if (errors.email?.includes("already exists")) {
//         alert("Email already registered. Please login!");
//         setView("login");
//       } else if (errors.username?.includes("already exists")) {
//         alert("Username already taken. Try another name.");
//       } else {
//         alert("Registration failed: " + JSON.stringify(errors));
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleForgotPassword = (e) => {
//     e.preventDefault();
//     if (formData.email) {
//       alert("Password reset link sent to " + formData.email);
//       setView("login");
//     } else {
//       alert("Please enter your campus email");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex"
//       style={{ fontFamily: "'Poppins', sans-serif" }}
//     >
//       {/* Left Panel - Campverse intro (unchanged) */}
//       <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-sky-500 via-indigo-600 to-emerald-500 relative overflow-hidden">
//         {/* Animated floating bubbles */}
//         <div className="bubble bubble-1"></div>
//         <div className="bubble bubble-2"></div>
//         <div className="bubble bubble-3"></div>
//         <div className="bubble bubble-4"></div>
//         <div className="bubble bubble-5"></div>
//         <div className="bubble bubble-6"></div>

//         <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
//           <div className="mb-8">
//             <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-6 shadow-xl border border-white/30">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-10 w-10"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 7l9-4 9 4-9 4-9-4z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 7v10l9 4 9-4V7"
//                 />
//               </svg>
//             </div>
//             <p className="text-sm uppercase tracking-[0.25em] text-sky-100/80 mb-2">
//               Your Campus, Connected
//             </p>
//             <h1 className="text-5xl font-bold mb-4 leading-tight">
//               Welcome to Campverse
//             </h1>
//             <p className="text-xl text-sky-50/90 leading-relaxed">
//               Manage lost items, notices, marketplace, feedback and campus records from one powerful dashboard.
//             </p>
//           </div>
//         </div>

//         {/* Bubbles CSS */}
//         <style>{`
//           .bubble {
//             position: absolute;
//             background: rgba(255, 255, 255, 0.15);
//             backdrop-filter: blur(10px);
//             border: 1px solid rgba(255, 255, 255, 0.2);
//             border-radius: 50%;
//             animation: float 20s infinite ease-in-out;
//           }
          
//           .bubble-1 { width: 80px; height: 80px; top: 10%; left: 10%; animation-duration: 15s; animation-delay: 0s; }
//           .bubble-2 { width: 120px; height: 120px; top: 60%; left: 70%; animation-duration: 20s; animation-delay: 2s; }
//           .bubble-3 { width: 60px; height: 60px; top: 30%; left: 80%; animation-duration: 18s; animation-delay: 4s; }
//           .bubble-4 { width: 100px; height: 100px; top: 80%; left: 20%; animation-duration: 22s; animation-delay: 1s; }
//           .bubble-5 { width: 70px; height: 70px; top: 50%; left: 40%; animation-duration: 17s; animation-delay: 3s; }
//           .bubble-6 { width: 90px; height: 90px; top: 15%; left: 50%; animation-duration: 19s; animation-delay: 5s; }
          
//           @keyframes float {
//             0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
//             25% { transform: translate(20px, -30px) scale(1.1); opacity: 0.9; }
//             50% { transform: translate(-15px, -60px) scale(0.95); opacity: 0.6; }
//             75% { transform: translate(25px, -40px) scale(1.05); opacity: 0.8; }
//           }
//         `}</style>
//       </div>

//       {/* Right Side - Forms */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
//         <div className="w-full max-w-md">
//           {/* LOGIN FORM */}
//           {view === "login" && (
//             <div className="bg-white rounded-3xl shadow-2xl p-10 transform transition-all duration-500">
//               <div className="text-center mb-8">
//                 <h2 className="text-3xl font-bold text-slate-800 mb-2">Sign in to Campverse</h2>
//                 <p className="text-slate-500">Use your campus email to access all Campverse modules.</p>
//               </div>

//               <form onSubmit={handleLogin} className="space-y-5">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">Campus Email</label>
//                   <div className="relative">
//                     <input
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       type="email"
//                       className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition text-slate-800 bg-slate-50"
//                       placeholder="you@college.edu"
//                       required
//                     />
//                     <span className="absolute left-4 top-4 text-slate-400">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zM12 8v4m0 4h.01" />
//                       </svg>
//                     </span>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
//                   <div className="relative">
//                     <input
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       type={showPassword ? "text" : "password"}
//                       className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition text-slate-800 bg-slate-50"
//                       placeholder="••••••••"
//                       required
//                     />
//                     <span className="absolute left-4 top-4 text-slate-400">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                       </svg>
//                     </span>
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
//                     >
//                       {showPassword ? (
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         </svg>
//                       ) : (
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                         </svg>
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`w-full py-4 rounded-xl text-white font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center ${
//                     loading
//                       ? "bg-slate-400 cursor-not-allowed"
//                       : "bg-gradient-to-r from-sky-600 to-indigo-500 hover:from-sky-700 hover:to-indigo-600"
//                   }`}
//                 >
//                   {loading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Signing in...
//                     </>
//                   ) : (
//                     "Sign in"
//                   )}
//                 </button>
//               </form>

//               <div className="mt-8 text-center space-y-4">
//                 <Link
//                   to="/forgot-password"
//                   className="text-sm text-sky-500 hover:text-sky-600 font-medium"
//                 >
//                   Forgot password?
//                 </Link>
//                 <div className="border-t border-slate-200 pt-4">
//                   <button
//                     onClick={() => setView("signup")}
//                     className="text-sm text-slate-600 hover:text-slate-900 font-medium"
//                   >
//                     Don't have an account?{" "}
//                     <span className="text-sky-500 font-semibold">Create one</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* SIGNUP FORM */}
//           {view === "signup" && (
//             <div className="bg-white rounded-3xl shadow-2xl p-10 transform transition-all duration-500">
//               <div className="text-center mb-8">
//                 <h2 className="text-3xl font-bold text-slate-800 mb-2">Create Campverse Account</h2>
//                 <p className="text-slate-500">Join Campverse campus community in a single step.</p>
//               </div>

//               <form onSubmit={handleSignup} className="space-y-5">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
//                   <input
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     type="text"
//                     className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition text-slate-800 bg-slate-50"
//                     placeholder="John Doe"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">Campus Email</label>
//                   <input
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     type="email"
//                     className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition text-slate-800 bg-slate-50"
//                     placeholder="you@college.edu"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
//                   <input
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     type={showPassword ? "text" : "password"}
//                     className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition text-slate-800 bg-slate-50"
//                     placeholder="••••••••"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm Password</label>
//                   <input
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     type={showPassword ? "text" : "password"}
//                     className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition text-slate-800 bg-slate-50"
//                     placeholder="••••••••"
//                     required
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`w-full py-4 rounded-xl text-white font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center ${
//                     loading
//                       ? "bg-slate-400 cursor-not-allowed"
//                       : "bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600"
//                   }`}
//                 >
//                   {loading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Creating account...
//                     </>
//                   ) : (
//                     "Create Campverse Account"
//                   )}
//                 </button>
//               </form>

//               <div className="mt-8 text-center">
//                 <button
//                   onClick={() => setView("login")}
//                   className="text-sm text-slate-600 hover:text-slate-900 font-medium"
//                 >
//                   Already have an account?{" "}
//                   <span className="text-sky-500 font-semibold">Sign in</span>
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
