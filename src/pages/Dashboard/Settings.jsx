import React from "react";

const Settings = () => {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Account Settings */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Account</h2>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className="input input-bordered w-full"
                defaultValue="@johndoe"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="input input-bordered w-full"
                defaultValue="john.doe@example.com"
              />
            </div>

            <div className="form-control mt-4">
              <button className="btn btn-primary">Save Changes</button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Notifications</h2>

            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-4">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  defaultChecked
                />
                <span className="label-text">Email Notifications</span>
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-4">
                <input type="checkbox" className="toggle toggle-primary" />
                <span className="label-text">Push Notifications</span>
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-4">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  defaultChecked
                />
                <span className="label-text">SMS Alerts</span>
              </label>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Appearance</h2>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Theme</span>
              </label>
              <select className="select select-bordered w-full max-w-xs">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Font Size</span>
              </label>
              <input
                type="range"
                min="12"
                max="20"
                defaultValue="16"
                className="range range-primary"
              />
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Privacy</h2>

            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-4">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  defaultChecked
                />
                <span className="label-text">Private Profile</span>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Two-Factor Authentication</span>
              </label>
              <button className="btn btn-outline btn-sm">Enable 2FA</button>
            </div>

            <div className="form-control mt-4">
              <button className="btn btn-error">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
