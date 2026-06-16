import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const profileService = {
  // ================= USER =================

  getCurrentUser: async () => {
    const res = await axios.get(`${API_URL}/users/me`, {
      headers: getAuthHeaders(),
    });

    return res.data.data;
  },

  updateUserProfile: async (profileData) => {
    const res = await axios.patch(
      `${API_URL}/users/update-profile`,
      {
        fullName: profileData.fullName,
        phoneNumber: profileData.phoneNumber,
        address: profileData.address,
      },
      {
        headers: getAuthHeaders(),
      },
    );

    return res.data.data;
  },

  // ================= SELLER PROFILE =================

  getProfile: async () => {
    const res = await axios.get(`${API_URL}/seller/profile`, {
      headers: getAuthHeaders(),
    });

    return res.data.data;
  },

  createSellerProfile: async (profileData) => {
    const payload = {
      storeName: profileData.storeName,
      gstNumber: profileData.gstNumber,

      governmentIdType: profileData.governmentIdType,
      governmentIdNumber: profileData.governmentIdNumber,

      bankAccountHolderName: profileData.bankAccountHolderName,
      bankAccountNumber: profileData.bankAccountNumber,
      ifscCode: profileData.ifscCode,
      bankName: profileData.bankName,

      upiId: profileData.upiId,
    };

    const res = await axios.post(`${API_URL}/seller/profile`, payload, {
      headers: getAuthHeaders(),
    });

    return res.data.data;
  },

  // alias for update
  saveProfile: async (profileData) => {
    const res = await axios.post(`${API_URL}/seller/profile`, profileData, {
      headers: getAuthHeaders(),
    });

    return res.data.data;
  },

  // ================= AVATAR =================

  uploadAvatar: async (file) => {
    const formData = new FormData();

    formData.append("avatar", file);

    const res = await axios.patch(`${API_URL}/users/avatar`, formData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

  // ================= GOVERNMENT ID =================

  uploadGovernmentId: async (file) => {
    const formData = new FormData();

    formData.append("governmentIdImage", file);

    const res = await axios.patch(`${API_URL}/seller/government-id`, formData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

  // ================= EMAIL =================

  sendVerificationEmail: async () => {
    const res = await axios.post(
      `${API_URL}/auth/send-verification-email`,
      {},
      {
        headers: getAuthHeaders(),
      },
    );

    return res.data;
  },
};
