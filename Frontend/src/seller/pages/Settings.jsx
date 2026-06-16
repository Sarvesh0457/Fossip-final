import React from "react";
import "./Settings.css";

const Settings = () => {
  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account preferences and seller options.</p>
      </div>

      {/* Account */}
      <div className="settings-card">
        <h2>Account</h2>

        <div className="setting-item">
          <div>
            <h3>Email Notifications</h3>
            <p>Receive updates about orders and payments.</p>
          </div>

          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div>
            <h3>SMS Notifications</h3>
            <p>Get important order alerts on mobile.</p>
          </div>

          <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      {/* Store Preferences */}
      <div className="settings-card">
        <h2>Store Preferences</h2>

        <div className="setting-item">
          <div>
            <h3>Vacation Mode</h3>
            <p>Temporarily pause receiving new orders.</p>
          </div>

          <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div>
            <h3>Auto Accept Orders</h3>
            <p>Automatically confirm incoming orders.</p>
          </div>

          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      {/* Legal */}
      <div className="settings-card">
        <h2>Legal & Policies</h2>

        <div className="link-item">
          <span>Terms & Conditions</span>
          <button>View</button>
        </div>

        <div className="link-item">
          <span>Privacy Policy</span>
          <button>View</button>
        </div>

        <div className="link-item">
          <span>Seller Guidelines</span>
          <button>View</button>
        </div>

        <div className="link-item">
          <span>Return & Refund Policy</span>
          <button>View</button>
        </div>
      </div>

      {/* Security */}
      <div className="settings-card">
        <h2>Security</h2>

        <div className="link-item">
          <span>Change Password</span>
          <button>Change</button>
        </div>

        <div className="link-item">
          <span>Two-Factor Authentication</span>
          <button>Setup</button>
        </div>
      </div>

      {/* Support */}
      <div className="settings-card">
        <h2>Support</h2>

        <div className="link-item">
          <span>Help Center</span>
          <button>Open</button>
        </div>

        <div className="link-item">
          <span>Contact Support</span>
          <button>Contact</button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="settings-card danger-card">
        <h2>Danger Zone</h2>

        <div className="link-item">
          <span>Deactivate Seller Account</span>
          <button className="danger-btn">Deactivate</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
