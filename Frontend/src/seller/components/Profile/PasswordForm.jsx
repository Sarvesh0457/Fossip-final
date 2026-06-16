import React, { useState } from "react";

import { Lock, Eye, EyeOff, Save } from "lucide-react";

const PasswordForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (field, value) => {
    setPasswords((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      return alert("Please fill all password fields.");
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      return alert("Passwords do not match.");
    }

    onSubmit(passwords);

    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="profile-card">
      <div className="profile-card-header">
        <h2>Change Password</h2>

        <p>Update your account password securely.</p>
      </div>

      <div className="profile-grid">
        {/* Current Password */}
        <div className="form-group">
          <label>Current Password</label>

          <div className="input-wrapper">
            <Lock size={18} />

            <input
              type={showPassword ? "text" : "password"}
              value={passwords.currentPassword}
              onChange={(e) => handleChange("currentPassword", e.target.value)}
              placeholder="Enter current password"
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="form-group">
          <label>New Password</label>

          <div className="input-wrapper">
            <Lock size={18} />

            <input
              type={showPassword ? "text" : "password"}
              value={passwords.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
              placeholder="Enter new password"
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="form-group full-width">
          <label>Confirm Password</label>

          <div className="input-wrapper">
            <Lock size={18} />

            <input
              type={showPassword ? "text" : "password"}
              value={passwords.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
        </div>
      </div>

      <button className="profile-save-btn" onClick={handleSubmit}>
        <Save size={18} />
        Change Password
      </button>
    </div>
  );
};

export default PasswordForm;
