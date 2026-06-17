import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

import profile from "../Assets/profile.png";
import heart from "../Assets/Heart.png";
import cart from "../Assets/Shopping cart.png";
import menu from "../Assets/menu.png";

import Searchbar from "./Searchbar";
import { useAuth } from "../context/AuthContext";

const menuItems = [
  { name: "HOME", path: "/" },
  { name: "MEN", path: "/explore/men" },
  { name: "WOMEN", path: "/explore/women" },
  { name: "KIDS", path: "/explore/kids" },
  { name: "HOME DECOR", path: "/explore/home" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation(); // Helps us highlight the active page

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="top-announcement-bar">
        <div className="top-bar-content">
          <p>✨ FREE SHIPPING ON ORDERS OVER ₹999</p>
          <span className="divider">|</span>
          <p>EASY 30-DAY RETURNS</p>
          <span className="divider">|</span>
          <p>NEW ARRIVALS EVERY WEEK</p>
        </div>
      </div>

      {/* Main Header Container */}
      <header className="main-header">
        <div className="header-container">
          {/* Mobile Menu Trigger */}
          <div
            className="mobile-menu-trigger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img src={menu} alt="Open Menu" />
          </div>

          {/* Premium Clean Logo */}
          <div className="brand-logo">
            <Link to="/">Urban Fashion</Link>
          </div>

          {/* Navigation Links */}
          <nav className="navigation-links">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={isActive ? "active-link" : ""}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Modern Search Wrapper */}
          <div className="search-wrapper">
            <Searchbar />
          </div>

          {/* Action Utilities Group */}
          <div className="utility-actions">
            {/* Account Profile Link */}
            <div className="profile-dropdown-wrapper">
              {!user ? (
                <Link to="/login" className="utility-item-link">
                  <div className="utility-card">
                    <img src={profile} alt="Account" />
                    <span className="utility-text">Login</span>
                  </div>
                </Link>
              ) : (
                <>
                  <div
                    className="utility-card profile-trigger"
                    onClick={() => setProfileDropdown(!profileDropdown)}
                  >
                    <img src={profile} alt="Account" />

                    <span className="utility-text">{user.username}</span>

                    <span className="dropdown-arrow">▼</span>
                  </div>

                  {profileDropdown && (
                    <div className="profile-dropdown">
                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdown(false)}
                      >
                        My Profile
                      </Link>

                      <Link
                        to="/orders"
                        onClick={() => setProfileDropdown(false)}
                      >
                        Order History
                      </Link>

                      <button
                        className="dropdown-logout-btn"
                        onClick={() => {
                          logout();
                          setProfileDropdown(false);
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Wishlist Link */}
            <Link to="/wishlist" className="utility-item-link">
              <div className="utility-card">
                <img src={heart} alt="Wishlist" />
                <span className="utility-text">Wishlist</span>
              </div>
            </Link>

            {/* Shopping Cart Link */}
            <Link to="/cart" className="utility-item-link">
              <div className="utility-card">
                <img src={cart} alt="Cart" />
                <span className="utility-text">Cart</span>
              </div>
            </Link>

            {/* Elegant Logout Utility */}
            {user && (
              <button onClick={logout} className="navbar-logout-btn">
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Sidebar/Dropdown Menu */}
      {menuOpen && (
        <div className="mobile-navigation-overlay">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
