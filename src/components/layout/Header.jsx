import React, { useEffect } from "react";
import useLogin from "../../hooks/auth/useLogin";

export default function Header() {
  const {patientProfile, fetchPatientProfile} = useLogin();

  useEffect(() => {
    fetchPatientProfile()
  }, [])

  const patientName = patientProfile?.patientName || "Patient";

  console.log("patientProfile", patientProfile)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
            <i className="pi pi-heart-fill text-white text-lg"></i>
          </div>

          <div>
            <h1 className="text-lg font-bold text-gray-800">
              Patient Portal
            </h1>

            <p className="text-xs text-gray-500">
              Medical Records
            </p>
          </div>
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">
              {patientName}
            </p>

            <p className="text-xs text-gray-500">
              {patientProfile?.patientId}
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <i className="pi pi-user text-blue-600">{patientProfile?.patientName?.charAt(0)}</i>
          </div>
        </div>
      </div>
    </header>
  );
}