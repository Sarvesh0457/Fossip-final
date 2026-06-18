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

  /* ================= INPUT HANDLERS ================= */

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
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

  /* ================= SAFE PROFILE CREATION ================= */

  const createOrLoadSellerProfile = async () => {
    try {
      setLoading(true);

      // 1. Try fetching seller profile
      const data = await profileService.getOrCreateSellerProfile();

      // 2. If backend returns seller → done
      if (data?.seller) {
        return { exists: true, data: data.seller };
      }

      // 3. If not → backend should auto-create
      return { exists: false, data: data };
    } catch (error) {
      // ❌ DO NOT spam console or alert for expected cases
      console.log("Seller profile not found, creating...");

      try {
        // fallback create
        const created = await profileService.createSellerProfile(profile);

        return { exists: false, data: created };
      } catch (err) {
        console.error("Failed to create seller profile:", err);
        return false;
      } finally {
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE USER ================= */

  const savePersonalDetails = async () => {
    try {
      await profileService.updateUserProfile(profile);
      return true;
    } catch (error) {
      console.error("Update failed:", error);
      return false;
    }
  };

  /* ================= CREATE FULL PROFILE ================= */

  const createProfile = async () => {
    try {
      setLoading(true);

      await profileService.updateUserProfile(profile);
      await profileService.createSellerProfile(profile);

      return true;
    } catch (error) {
      console.error("Create profile failed:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    profile,

    handleInputChange,
    handleAddressChange,

    createProfile,
    createOrLoadSellerProfile,
    savePersonalDetails,
  };
};

export default useCreateProfile;
