import React from "react";
import { Camera } from "lucide-react";

const ProfilePhotoCard = ({ avatar, onImageChange }) => {
  return (
    <div className="profile-card">
      <div className="profile-card-header">
        <h2>Profile Photo</h2>

        <p>Upload a profile image for your seller account.</p>
      </div>

      <div className="profile-photo-container">
        <img
          src={avatar?.url || "https://placehold.co/200x200"}
          alt="Seller Avatar"
          className="profile-photo"
        />

        <div>
          <label className="upload-btn">
            <Camera size={18} />
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onImageChange(e.target.files?.[0])}
            />
          </label>

          <p
            style={{
              marginTop: "12px",
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            JPG, PNG up to 5MB.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotoCard;
