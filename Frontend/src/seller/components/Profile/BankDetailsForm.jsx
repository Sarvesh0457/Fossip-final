import React from "react";
import {
  Landmark,
  User,
  CreditCard,
  Building2,
  Hash,
  Smartphone,
  Save,
} from "lucide-react";

const BankDetailsForm = ({ profile, onInputChange, onSave }) => {
  return (
    <div className="profile-card">
      <div className="profile-card-header">
        <h2>Bank Details</h2>

        <p>Manage your payout and settlement information.</p>
      </div>

      <div className="profile-grid">
        {/* Account Holder */}
        <div className="form-group">
          <label>Account Holder Name</label>

          <div className="input-wrapper">
            <User size={18} />

            <input
              type="text"
              value={profile.bankAccountHolderName || ""}
              onChange={(e) =>
                onInputChange("bankAccountHolderName", e.target.value)
              }
              placeholder="Enter account holder name"
            />
          </div>
        </div>

        {/* Bank Name */}
        <div className="form-group">
          <label>Bank Name</label>

          <div className="input-wrapper">
            <Building2 size={18} />

            <input
              type="text"
              value={profile.bankName || ""}
              onChange={(e) => onInputChange("bankName", e.target.value)}
              placeholder="Enter bank name"
            />
          </div>
        </div>

        {/* Account Number */}
        <div className="form-group">
          <label>Bank Account Number</label>

          <div className="input-wrapper">
            <CreditCard size={18} />

            <input
              type="text"
              value={profile.bankAccountNumber || ""}
              onChange={(e) =>
                onInputChange("bankAccountNumber", e.target.value)
              }
              placeholder="Enter account number"
            />
          </div>
        </div>

        {/* IFSC */}
        <div className="form-group">
          <label>IFSC Code</label>

          <div className="input-wrapper">
            <Hash size={18} />

            <input
              type="text"
              value={profile.ifscCode || ""}
              onChange={(e) =>
                onInputChange("ifscCode", e.target.value.toUpperCase())
              }
              placeholder="SBIN0001234"
            />
          </div>
        </div>

        {/* UPI */}
        <div className="form-group full-width">
          <label>UPI ID</label>

          <div className="input-wrapper">
            <Smartphone size={18} />

            <input
              type="text"
              value={profile.upiId || ""}
              onChange={(e) => onInputChange("upiId", e.target.value)}
              placeholder="seller@upi"
            />
          </div>
        </div>
      </div>

      {onSave && (
        <button className="profile-save-btn" onClick={onSave}>
          <Save size={18} />
          Save Bank Details
        </button>
      )}
    </div>
  );
};

export default BankDetailsForm;
