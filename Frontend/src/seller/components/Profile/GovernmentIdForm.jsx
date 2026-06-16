import React from "react";

import {
  CreditCard,
  Hash,
  Upload,
  Save,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

const GovernmentIdForm = ({
  profile,
  onInputChange,
  onImageChange,
  onSave,
}) => {
  const verificationStatus = profile.verificationStatus || "pending";

  return (
    <div className="profile-card">
      <div className="profile-card-header">
        <h2>Government Verification</h2>

        <p>Upload government documents for seller verification.</p>
      </div>

      {/* Verification Badge */}
      <div className={`verification-badge ${verificationStatus}`}>
        {verificationStatus === "approved" && (
          <>
            <CheckCircle size={18} />
            Verified
          </>
        )}

        {verificationStatus === "pending" && (
          <>
            <Clock size={18} />
            Verification Pending
          </>
        )}

        {verificationStatus === "rejected" && (
          <>
            <XCircle size={18} />
            Verification Rejected
          </>
        )}
      </div>

      <div className="profile-grid">
        {/* Govt ID Type */}
        <div className="form-group">
          <label>Government ID Type</label>

          <div className="input-wrapper">
            <CreditCard size={18} />

            <select
              value={profile.governmentIdType || ""}
              onChange={(e) =>
                onInputChange("governmentIdType", e.target.value)
              }
            >
              <option value="">Select ID Type</option>

              <option value="aadhaar">Aadhaar Card</option>

              <option value="pan">PAN Card</option>

              <option value="passport">Passport</option>

              <option value="driving_license">Driving License</option>
            </select>
          </div>
        </div>

        {/* Govt ID Number */}
        <div className="form-group">
          <label>Government ID Number</label>

          <div className="input-wrapper">
            <Hash size={18} />

            <input
              type="text"
              value={profile.governmentIdNumber || ""}
              onChange={(e) =>
                onInputChange("governmentIdNumber", e.target.value)
              }
              placeholder="Enter ID Number"
            />
          </div>
        </div>

        {/* Govt ID Upload */}
        <div className="form-group full-width">
          <label>Government ID Image</label>

          <label className="upload-btn">
            <Upload size={18} />
            Upload Document
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onImageChange(e.target.files?.[0])}
            />
          </label>

          {(profile?.governmentIdImage?.url ||
            profile?.governmentIdImagePreview) && (
            <img
              src={
                profile?.governmentIdImage?.url ||
                profile?.governmentIdImagePreview
              }
              alt="Government ID"
              className="id-preview"
            />
          )}
        </div>
      </div>

      {onSave && (
        <button className="profile-save-btn" onClick={onSave}>
          <Save size={18} />
          Save Verification Details
        </button>
      )}
    </div>
  );
};

export default GovernmentIdForm;
