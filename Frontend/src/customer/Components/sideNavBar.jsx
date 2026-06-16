import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiShoppingBag,
  FiLayers,
  FiTag,
  FiTrendingUp,
  FiFolder,
  FiStar,
  FiPercent,
  FiImage,
  FiBell,
  FiSettings,
  FiUser,
  FiChevronLeft,
  FiMenu,
  FiX,
} from "react-icons/fi";

export const menuItems = [
  { path: "/", name: "Dashboard", icon: FiGrid },
  { path: "/products", name: "Products", icon: FiShoppingBag },
  { path: "/categories", name: "Categories", icon: FiFolder },
  { path: "/brands", name: "Brands", icon: FiLayers },
  { path: "/inventory", name: "Inventory", icon: FiTag },
  { path: "/orders", name: "Orders", icon: FiTrendingUp },
  { path: "/customers", name: "Customers", icon: FiUser },
  { path: "/reviews", name: "Reviews", icon: FiStar },
  { path: "/coupons", name: "Coupons", icon: FiPercent },
  { path: "/banners", name: "Banners", icon: FiImage },
  { path: "/reports", name: "Reports", icon: FiTrendingUp },
  { path: "/notifications", name: "Notifications", icon: FiBell },
  { path: "/settings", name: "Store Settings", icon: FiSettings },
  { path: "/profile", name: "Profile", icon: FiUser },
];

export const Sidebar = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  // Customer sidebar does not use the seller ThemeContext

  const handleLinkClick = () => {
    if (mobileOpen) setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800/60 transition-all duration-300">
      {/* Brand logo header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-tr from-lime-500 to-lime-600 shadow-md shadow-lime-500/20 shrink-0">
            <span className="text-white font-extrabold text-lg">F</span>
          </div>
          {(!collapsed || mobileOpen) && (
            <span className="font-bold text-lg bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent uppercase tracking-wider transition-opacity duration-300">
              VogueAdmin
            </span>
          )}
        </div>

        {/* Toggle Collapse Button for desktop/tablet */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
        >
          <FiChevronLeft
            className={`w-4 h-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
          />
        </button>

        {/* Mobile close menu */}
        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Sidebar Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleLinkClick}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-[14px] transition-all duration-150
                ${
                  isActive
                    ? "bg-lime-50 dark:bg-lime-950/20 text-lime-700 dark:text-lime-400 border-l-2 border-lime-500"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/50"
                }
              `}
            >
              <IconComponent className="w-5 h-5 shrink-0" />
              {(!collapsed || mobileOpen) && (
                <span className="truncate">{item.name}</span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Footer / User short info */}
      <div className="p-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-3">
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
          alt="Sarah Connor"
          className="w-9 h-9 rounded-full object-cover shadow border border-slate-200 dark:border-slate-700"
        />
        {(!collapsed || mobileOpen) && (
          <div className="flex flex-col overflow-hidden">
            <span className="font-semibold text-xs text-slate-900 dark:text-white truncate">
              Sarah Connor
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              Store Owner
            </span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <aside
        className={`hidden md:block h-screen fixed top-0 left-0 z-30 transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* Backdrop overlay */}
        <div
          onClick={() => setMobileOpen(false)}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        {/* Sidebar container */}
        <div
          className={`absolute top-0 left-0 h-full w-64 shadow-2xl transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          {sidebarContent}
        </div>
      </div>
    </>
  );
};
