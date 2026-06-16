import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Menu,
  X,
} from "lucide-react";

import "./sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/seller",
    },
    {
      title: "Products",
      icon: <Package size={20} />,
      path: "/seller/products",
    },
    {
      title: "Orders",
      icon: <ShoppingCart size={20} />,
      path: "/seller/orders",
    },
    {
      title: "Customers",
      icon: <Users size={20} />,
      path: "/seller/customers",
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/seller/settings",
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Fashion Admin</h2>
          <p>Enterprise Edition</p>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <span className="menu-icon">{item.icon}</span>

              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
