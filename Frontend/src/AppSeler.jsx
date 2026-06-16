// src/AppSeller.jsx

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "./customer/context/AuthContext";
import { profileService } from "./seller/services/profileService";

import Sidebar from "./seller/components/Sidebar";
import Navbar from "./seller/components/Navbar";

import "./AppSeler.css";

const AppSeller = () => {
  const { user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [checkingProfile, setCheckingProfile] = useState(true);
  const [hasSellerProfile, setHasSellerProfile] = useState(false);

  useEffect(() => {
    const checkSellerProfile = async () => {
      try {
        // wait until user exists
        if (!user) {
          setCheckingProfile(false);
          return;
        }

        // allow sellers only
        if (user.role !== "seller") {
          navigate("/");
          return;
        }

        const sellerProfile = await profileService.getProfile();

        setHasSellerProfile(!!sellerProfile);
      } catch (error) {
        console.error("Profile check error:", error);

        // profile doesn't exist
        if (error.status === 404) {
          setHasSellerProfile(false);
        } else {
          setHasSellerProfile(false);
        }
      } finally {
        // IMPORTANT
        setCheckingProfile(false);
      }
    };

    checkSellerProfile();
  }, [user]);

  useEffect(() => {
    if (checkingProfile) return;

    // No profile → go to create profile
    if (!hasSellerProfile) {
      if (location.pathname !== "/seller/create-profile") {
        navigate("/seller/create-profile", { replace: true });
      }
    }

    // Profile exists → prevent visiting create profile page
    if (hasSellerProfile && location.pathname === "/seller/create-profile") {
      navigate("/seller", { replace: true });
    }
  }, [checkingProfile, hasSellerProfile, location.pathname]);

  if (checkingProfile) {
    return <div className="seller-loading">Loading...</div>;
  }

  // Create Profile page without sidebar
  if (!hasSellerProfile && location.pathname === "/seller/create-profile") {
    return (
      <main className="seller-content">
        <Outlet />
      </main>
    );
  }

  // Dashboard layout
  return (
    <div className="seller-layout">
      <Sidebar />

      <div className="seller-main">
        <Navbar />

        <main className="seller-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppSeller;