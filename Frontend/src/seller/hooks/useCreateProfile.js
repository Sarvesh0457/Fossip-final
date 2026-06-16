// src/seller/hooks/useCreateProfile.js

import { useState } from "react";
import { profileService } from "../services/profileService";

const initialState = {
  avatar: { url: "" },

  fullName: "",
  email: "",
  phoneNumber: "",

  address: {
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  },

  storeName: "",
  gstNumber: "",

  governmentIdType: "",
  governmentIdNumber: "",

  governmentIdImage: {
    url: "",
  },

  bankAccountHolderName: "",
  bankAccountNumber: "",
  ifscCode: "",
  bankName: "",
  upiId: "",
};

const useCreateProfile = () => {
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState(initialState);

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const createProfile = async () => {
    try {
      setLoading(true);

      // update user profile
      await profileService.updateUserProfile(profile);

      // create seller profile
      await profileService.createSellerProfile(profile);

      return true;
    } catch (error) {
      alert(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleAddressChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const savePersonalDetails = async () => {
    try {
      await profileService.updateUserProfile(profile);

      alert("Personal details updated.");

      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };

  return {
    loading,
    profile,
    handleInputChange,
    createProfile,
    handleAddressChange,
    savePersonalDetails,
  };
};

export default useCreateProfile;
