import API from "./axiosClient";

export const getProfileApi = () => {
  return API.get("/users/me");
};

export const updateProfileApi = (data) => {
  return API.patch("/users/update-profile", data);
};

export const deleteProfileApi = () => {
  return API.delete("/users/delete-account");
};

export const sendPhoneOtpApi = (phone) => {
  return API.post("/auth/send-phone-otp", { phone });
};

export const verifyPhoneOtpApi = (phone, otp) => {
  return API.post("/auth/verify-phone-otp", { phone, otp });
};
