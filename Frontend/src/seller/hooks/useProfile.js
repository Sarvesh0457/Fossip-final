import { useEffect, useState } from "react";
import { profileService } from "../services/profileService";

const initialState = {
  avatar: {
    url: "",
  },

  fullName: "",
  email: "",
  emailVerified: false,

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

  governmentIdImagePreview: "",

  bankAccountHolderName: "",
  bankAccountNumber: "",
  ifscCode: "",
  bankName: "",
  upiId: "",
};

const readApiData = (response) => response?.data || response || {};

const useProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(initialState);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError("");

      // fetch current user
      const userRes = await profileService.getCurrentUser();

      // seller profile may not exist (create profile page)
      let sellerRes = null;

      try {
        sellerRes = await profileService.getProfile();
      } catch (err) {
        sellerRes = null;
      }

      const seller = readApiData(sellerRes);
      const userData = readApiData(userRes);
      const user =
        Object.keys(userData).length > 0 ? userData : seller.user || {};

      setProfile({
        avatar: user.avatar || initialState.avatar,

        fullName: user.fullName || "",
        email: user.email || "",
        emailVerified: user.emailVerified ?? user.isEmailVerified ?? false,

        phoneNumber: user.phoneNumber || "",

        address: user.address || initialState.address,

        storeName: seller.storeName || "",
        gstNumber: seller.gstNumber || "",

        governmentIdType: seller.governmentIdType || "",
        governmentIdNumber: seller.governmentIdNumber || "",

        governmentIdImage:
          seller.governmentIdImage || initialState.governmentIdImage,

        governmentIdImagePreview: "",

        bankAccountHolderName: seller.bankAccountHolderName || "",

        bankAccountNumber: seller.bankAccountNumber || "",

        ifscCode: seller.ifscCode || "",

        bankName: seller.bankName || "",

        upiId: seller.upiId || "",

        verificationStatus: seller.verificationStatus || "pending",
      });
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message || err.message || "Failed to load profile",
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= INPUT HANDLERS =================

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

  // ================= AVATAR =================

  const handleProfileImageChange = async (file) => {
    if (!file) return;

    try {
      const preview = URL.createObjectURL(file);

      setProfile((prev) => ({
        ...prev,
        avatar: {
          url: preview,
        },
      }));

      const response = await profileService.uploadAvatar(file);

      setProfile((prev) => ({
        ...prev,
        avatar: response?.data?.avatar || prev.avatar,
      }));
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    }
  };

  // ================= GOVT ID =================

  const handleGovernmentImageChange = async (file) => {
    if (!file) return;

    try {
      const preview = URL.createObjectURL(file);

      setProfile((prev) => ({
        ...prev,
        governmentIdImagePreview: preview,
      }));

      const response = await profileService.uploadGovernmentId(file);

      setProfile((prev) => ({
        ...prev,
        governmentIdImage:
          response?.data?.governmentIdImage || prev.governmentIdImage,

        governmentIdImagePreview: "",
      }));
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    }
  };

  // ================= PERSONAL DETAILS =================

  const savePersonalDetails = async () => {
    try {
      await profileService.updateUserProfile(profile);

      alert("Personal details updated successfully.");

      return true;
    } catch (err) {
      alert(err?.response?.data?.message || err.message);

      return false;
    }
  };

  // ================= SELLER PROFILE =================

  const saveProfile = async () => {
    try {
      await profileService.createSellerProfile(profile);

      alert("Seller profile updated successfully.");

      return true;
    } catch (err) {
      alert(err?.response?.data?.message || err.message);

      return false;
    }
  };

  return {
    loading,
    error,
    profile,

    handleInputChange,
    handleAddressChange,

    handleProfileImageChange,
    handleGovernmentImageChange,

    savePersonalDetails,
    saveProfile,

    fetchProfileData,
  };
};

export default useProfile;
