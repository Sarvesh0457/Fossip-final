// src/seller/pages/Profile.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Profile.css";

import ProfilePhotoCard from "../components/Profile/ProfilePhotoCard";
import PersonalInfoForm from "../components/Profile/PersonalInfoForm";
import StoreInfoForm from "../components/Profile/StoreInfoForm";
import GovernmentIdForm from "../components/Profile/GovernmentIdForm";
import BankDetailsForm from "../components/Profile/BankDetailsForm";

import useProfile from "../hooks/useProfile";
import { profileService } from "../services/profileService";
import { useAuth } from "../../customer/context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [accountActionLoading, setAccountActionLoading] = useState("");

  const {
    loading,
    error,
    profile,

    handleInputChange,
    handleAddressChange,

    handleProfileImageChange,
    handleGovernmentImageChange,

    saveProfile,
    savePersonalDetails,
  } = useProfile();

  const handlePersonalSave = async () => {
    await savePersonalDetails();
  };

  const handleVerifyEmail = async () => {
    try {
      await profileService.sendVerificationEmail();

      alert("Verification email sent.");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSave = async () => {
    const success = await saveProfile();

    if (success) {
      alert("Profile updated successfully");
    }
  };

  const handleLogout = async () => {
    try {
      setAccountActionLoading("logout");
      await profileService.logout();
    } catch (err) {
      console.error(err);
    } finally {
      logout();
      setAccountActionLoading("");
      navigate("/login", { replace: true });
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone.",
    );

    if (!confirmed) return;

    try {
      setAccountActionLoading("delete");
      await profileService.deleteAccount();
      logout();
      alert("Account deleted successfully.");
      navigate("/", { replace: true });
    } catch (err) {
      alert(err?.response?.data?.message || err.message || "Delete failed");
    } finally {
      setAccountActionLoading("");
    }
  };

  if (loading) {
    return <div className="profile-loading">Loading...</div>;
  }

  if (error) {
    return <div className="profile-error">{error}</div>;
  }

  return (
    <div className="profile-page">
      {!profile.emailVerified && (
        <div className="verify-email-banner">
          <p>Your email is not verified.</p>

          <button className="verify-email-btn" onClick={handleVerifyEmail}>
            Verify Email
          </button>
        </div>
      )}

      <ProfilePhotoCard
        avatar={profile.avatar}
        onImageChange={handleProfileImageChange}
      />

      <PersonalInfoForm
        profile={profile}
        onInputChange={handleInputChange}
        onAddressChange={handleAddressChange}
        onSave={handlePersonalSave}
      />

      <StoreInfoForm
        profile={profile}
        onInputChange={handleInputChange}
        onSave={handleSave}
      />

      <GovernmentIdForm
        profile={profile}
        onInputChange={handleInputChange}
        onImageChange={handleGovernmentImageChange}
        onSave={handleSave}
      />

      <BankDetailsForm
        profile={profile}
        onInputChange={handleInputChange}
        onSave={handleSave}
      />

      <div className="profile-create-btn-container">
        <button className="profile-save-btn" onClick={handleSave}>
          Update Seller Profile
        </button>
      </div>

      <div className="profile-card account-actions-card">
        <div className="profile-card-header account-actions-header">
          <div>
            <h2>Account</h2>
            <p>Manage your seller session and account access.</p>
          </div>
        </div>

        <div className="account-actions">
          <button
            className="profile-secondary-btn"
            onClick={handleLogout}
            disabled={!!accountActionLoading}
          >
            {accountActionLoading === "logout" ? "Logging out..." : "Logout"}
          </button>

          <button
            className="profile-danger-btn"
            onClick={handleDeleteAccount}
            disabled={!!accountActionLoading}
          >
            {accountActionLoading === "delete"
              ? "Deleting..."
              : "Delete Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
