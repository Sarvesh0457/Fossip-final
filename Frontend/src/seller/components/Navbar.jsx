import React from "react";
import { Search, CircleHelp, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../customer/context/AuthContext";

import "./Navbar.css";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="navbar">
      {/* Left */}
      <div className="navbar-left">
        <h2 className="navbar-title">Dashboard</h2>
      </div>

      {/* Center */}
      <div className="navbar-center">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search data..." />
        </div>
      </div>

      {/* Right */}
      <div className="navbar-right">
        <button className="icon-btn">
          <CircleHelp size={20} />
        </button>

        <Link to="/seller/profile" className="profile-section">
          <div className="profile-info">
            <h4>{user?.fullName || user?.username || "Seller"}</h4>
            <span>Seller Account</span>
          </div>

          <div className="profile-icon">
            <UserCircle size={42} />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
