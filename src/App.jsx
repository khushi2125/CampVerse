//src/App.jsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/auth/LoginPage";
// import Register from "./pages/auth/Register";
// import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import CollegeManagement from "./pages/CollegeManagement";
import LostFound from "./pages/LostFound";
import Notices from "./pages/Notices";
import Marketplace from "./pages/Marketplace";
import Feedback from "./pages/Feedback";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<Register />} /> */}
      {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/college-management" element={
        <ProtectedRoute>
          <CollegeManagement />
        </ProtectedRoute>
      } />
      <Route path="/lost-found" element={
        <ProtectedRoute>
          <LostFound />
        </ProtectedRoute>
      } />
      <Route path="/notices" element={
        <ProtectedRoute>
          <Notices />
        </ProtectedRoute>
      } />
      <Route path="/marketplace" element={
        <ProtectedRoute>
          <Marketplace />
        </ProtectedRoute>
      } />
      <Route path="/feedback" element={
        <ProtectedRoute>
          <Feedback />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
