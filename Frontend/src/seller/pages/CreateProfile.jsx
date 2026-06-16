import React from "react";
import { useNavigate } from "react-router-dom";

import "./CreateProfile.css";

import ProfilePhotoCard from "../components/Profile/ProfilePhotoCard";
import PersonalInfoForm from "../components/Profile/PersonalInfoForm";
import StoreInfoForm from "../components/Profile/StoreInfoForm";
import GovernmentIdForm from "../components/Profile/GovernmentIdForm";
import BankDetailsForm from "../components/Profile/BankDetailsForm";

import useCreateProfile from "../hooks/useCreateProfile";

const CreateProfile = () => {
  const navigate = useNavigate();

  const {
    loading,
    profile,

    handleInputChange,
    handleAddressChange,

    handleProfileImageChange,
    handleGovernmentImageChange,

    createProfile,
    savePersonalDetails,
  } = useCreateProfile();

  const handleSave = async () => {
    const success = await createProfile();

    if (success) {
      alert("Seller profile has been created successfully!");

      setTimeout(() => {
        navigate("/seller");
      }, 2000);
    }
  };

  return (
    <div className="create-profile-page">
      <div className="create-profile-header">
        <h1>Create Seller Profile</h1>

        <p>Complete your personal and seller information to start selling.</p>
      </div>

      <PersonalInfoForm
        profile={profile}
        onInputChange={handleInputChange}
        onAddressChange={handleAddressChange}
        onSave={savePersonalDetails}
      />

      <StoreInfoForm profile={profile} onInputChange={handleInputChange} />

      <GovernmentIdForm
        profile={profile}
        onInputChange={handleInputChange}
        onImageChange={handleGovernmentImageChange}
      />

      <BankDetailsForm profile={profile} onInputChange={handleInputChange} />

      <button
        className="create-profile-btn"
        disabled={loading}
        onClick={handleSave}
      >
        {loading ? "Creating..." : "Create Seller Profile"}
      </button>
    </div>
  );
};

export default CreateProfile;
