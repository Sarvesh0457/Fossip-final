// src/seller/pages/Profile.jsx

import React from "react";

import "./profile.css";

import ProfilePhotoCard from "../components/Profile/ProfilePhotoCard";
import PersonalInfoForm from "../components/Profile/PersonalInfoForm";
import StoreInfoForm from "../components/Profile/StoreInfoForm";
import GovernmentIdForm from "../components/Profile/GovernmentIdForm";
import BankDetailsForm from "../components/Profile/BankDetailsForm";

import useProfile from "../hooks/useProfile";
import { profileService } from "../services/profileService";

const Profile = () => {
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
    </div>
  );
};

export default Profile;
