import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/auth/useLogin";

export default function BottomNav() {
  const navigate = useNavigate();
const {resetPatientProfile} = useLogin();

  const handleLogout = () => {
    sessionStorage.clear();
    resetPatientProfile();
    navigate("/");
  };

  const navClass = ({ isActive }) =>
    `flex flex-col items-center justify-center gap-1 ${
      isActive
        ? "text-blue-600"
        : "text-gray-500"
    }`;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 shadow-lg z-50">

      <div className="grid grid-cols-3 h-full">

        {/* Reports */}
        <NavLink
          to="/my-reports"
          className={navClass}
        >
          <i className="pi pi-file text-xl"></i>
          <span className="text-xs font-medium">
            Reports
          </span>
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/profile"
          className={navClass}
        >
          <i className="pi pi-user text-xl"></i>
          <span className="text-xs font-medium">
            Profile
          </span>
        </NavLink>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center gap-1 text-red-500"
        >
          <i className="pi pi-sign-out text-xl"></i>
          <span className="text-xs font-medium">
            Logout
          </span>
        </button>

      </div>
    </div>
  );
}