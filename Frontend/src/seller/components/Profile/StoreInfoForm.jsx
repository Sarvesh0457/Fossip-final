import React from "react";
import { Store, Receipt, Save } from "lucide-react";

const StoreInfoForm = ({ profile, onInputChange, onSave }) => {
  return (
    <div className="profile-card">
      <div className="profile-card-header">
        <h2>Store Information</h2>

        <p>Manage your business details and GST information.</p>
      </div>

      <div className="profile-grid">
        {/* Store Name */}
        <div className="form-group">
          <label>Store Name *</label>

          <div className="input-wrapper">
            <Store size={18} />

            <input
              type="text"
              value={profile.storeName || ""}
              onChange={(e) => onInputChange("storeName", e.target.value)}
              placeholder="Enter store name"
            />
          </div>
        </div>

        {/* GST */}
        <div className="form-group">
          <label>GST Number</label>

          <div className="input-wrapper">
            <Receipt size={18} />

            <input
              type="text"
              value={profile.gstNumber || ""}
              onChange={(e) => onInputChange("gstNumber", e.target.value)}
              placeholder="22AAAAA0000A1Z5"
            />
          </div>
        </div>
      </div>

      {onSave && (
        <button className="profile-save-btn" onClick={onSave}>
          <Save size={18} />
          Save Store Information
        </button>
      )}
    </div>
  );
};

export default StoreInfoForm;
