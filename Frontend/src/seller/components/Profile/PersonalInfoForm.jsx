import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Map,
  Building,
  Globe,
  Hash,
  Save,
} from "lucide-react";

const PersonalInfoForm = ({
  profile,
  onInputChange,
  onAddressChange,
  onSave,
}) => {
  return (
    <div className="profile-card">
      <div className="profile-card-header">
        <h2>Personal Information</h2>
        <p>Update your account and contact details.</p>
      </div>

      <div className="profile-grid">
        {/* Full Name */}
        <div className="form-group">
          <label>Full Name</label>

          <div className="input-wrapper">
            <User size={18} />

            <input
              type="text"
              value={profile.fullName || ""}
              onChange={(e) => onInputChange("fullName", e.target.value)}
              placeholder="Enter full name"
            />
          </div>
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email Address</label>

          <div className="input-wrapper">
            <Mail size={18} />

            <input type="email" value={profile.email || ""} disabled />
          </div>
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>Phone Number</label>

          <div className="input-wrapper">
            <Phone size={18} />

            <input
              type="text"
              value={profile.phoneNumber || ""}
              onChange={(e) => onInputChange("phoneNumber", e.target.value)}
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
        </div>

        {/* Street */}
        <div className="form-group">
          <label>Street Address</label>

          <div className="input-wrapper">
            <MapPin size={18} />

            <input
              type="text"
              value={profile.address?.street || ""}
              onChange={(e) => onAddressChange("street", e.target.value)}
              placeholder="Street address"
            />
          </div>
        </div>

        {/* City */}
        <div className="form-group">
          <label>City</label>

          <div className="input-wrapper">
            <Building size={18} />

            <input
              type="text"
              value={profile.address?.city || ""}
              onChange={(e) => onAddressChange("city", e.target.value)}
              placeholder="City"
            />
          </div>
        </div>

        {/* State */}
        <div className="form-group">
          <label>State</label>

          <div className="input-wrapper">
            <Map size={18} />

            <input
              type="text"
              value={profile.address?.state || ""}
              onChange={(e) => onAddressChange("state", e.target.value)}
              placeholder="State"
            />
          </div>
        </div>

        {/* Country */}
        <div className="form-group">
          <label>Country</label>

          <div className="input-wrapper">
            <Globe size={18} />

            <input
              type="text"
              value={profile.address?.country || ""}
              onChange={(e) => onAddressChange("country", e.target.value)}
              placeholder="Country"
            />
          </div>
        </div>

        {/* Pincode */}
        <div className="form-group">
          <label>Pincode</label>

          <div className="input-wrapper">
            <Hash size={18} />

            <input
              type="text"
              value={profile.address?.pincode || ""}
              onChange={(e) => onAddressChange("pincode", e.target.value)}
              placeholder="Pincode"
            />
          </div>
        </div>
      </div>

      {onSave && (
        <button className="profile-save-btn" onClick={onSave}>
          <Save size={18} />
          Save Personal Information
        </button>
      )}
    </div>
  );
};

export default PersonalInfoForm;
