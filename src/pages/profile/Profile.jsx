import React, { useEffect } from 'react';
import useLogin from '../../hooks/auth/useLogin';

const Profile = () => {
    const { patientProfile, fetchPatientProfile, loading } = useLogin();

    useEffect(() => {
        fetchPatientProfile();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-60">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-4 pb-24">
            <div className="bg-white rounded-3xl shadow-md overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white text-center">
                    <div className="w-24 h-24 mx-auto rounded-full bg-white text-blue-600 flex items-center justify-center text-4xl font-bold shadow-lg">
                        {patientProfile?.patientName?.charAt(0)?.toUpperCase()}
                    </div>

                    <h2 className="mt-4 text-2xl font-bold">
                        {patientProfile?.patientName}
                    </h2>

                    <p className="text-blue-100">
                        Patient ID: {patientProfile?.patientId}
                    </p>
                </div>

                {/* Details */}
                <div className="p-5 space-y-4">

                    <div className="flex items-center justify-between border-b pb-3">
                        <span className="text-gray-500">
                            Gender
                        </span>
                        <span className="font-semibold text-gray-800">
                            {patientProfile?.gender || "-"}
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-b pb-3">
                        <span className="text-gray-500">
                            Mobile Number
                        </span>
                        <span className="font-semibold text-gray-800">
                            {patientProfile?.mobileNumber || "-"}
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-b pb-3">
                        <span className="text-gray-500">
                            Aadhaar Number
                        </span>
                        <span className="font-semibold text-gray-800">
                            {patientProfile?.aadhaarNumber || "-"}
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-b pb-3">
                        <span className="text-gray-500">
                            Patient ID
                        </span>
                        <span className="font-semibold text-gray-800">
                            {patientProfile?.patientId || "-"}
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;