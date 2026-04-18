//src/layouts/MainLayout.jsx

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-all duration-300">
     
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content - Full width with proper padding */}
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
      
    </div>
  );
};

export default MainLayout;

