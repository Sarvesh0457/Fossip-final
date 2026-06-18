import API from "./axiosService";

export const profileService = {
  // ================= USER =================

  getCurrentUser: async () => {
    const res = await API.get("/users/me");
    return res.data.data;
  },

  updateUserProfile: async (profileData) => {
    const res = await API.patch("/users/update-profile", {
      fullName: profileData.fullName,
      phoneNumber: profileData.phoneNumber,
      address: profileData.address,
    });

    return res.data.data;
  },

  // ================= SELLER PROFILE =================

  getProfile: async () => {
    const res = await API.get("/seller/profile");
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

    const res = await API.post("/seller/profile", payload);

    return res.data.data;
  },

  saveProfile: async (profileData) => {
    const res = await API.post("/seller/profile", profileData);

    return res.data.data;
  },

  // ================= AVATAR =================

  uploadAvatar: async (file) => {
    const formData = new FormData();

    formData.append("avatar", file);

    const res = await API.patch("/users/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

  // ================= GOVERNMENT ID =================

  uploadGovernmentId: async (file) => {
    const formData = new FormData();

    formData.append("governmentIdImage", file);

    const res = await API.patch("/seller/government-id", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

  // ================= EMAIL =================

  sendVerificationEmail: async () => {
    const res = await API.post("/auth/resend-email-verification");

    return res.data;
  },

  logout: async () => {
    const res = await API.post("/auth/logout");

    return res.data;
  },

  deleteAccount: async () => {
    const res = await API.delete("/users/delete-account");

    return res.data;
  },
};
