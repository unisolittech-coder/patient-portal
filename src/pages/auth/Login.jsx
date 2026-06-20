import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/auth/useLogin";

export default function Login() {
    const navigate = useNavigate();
    const { patientlogin, verifyOtp, loading } = useLogin();

    const [showOtpScreen, setShowOtpScreen] = useState(false);

    const mobileFormik = useFormik({
        initialValues: {
            mobileNumber: "",
        },

        validationSchema: Yup.object({
            mobileNumber: Yup.string()
                .required("Mobile Number is required")
                .matches(/^[0-9]{10,12}$/, "Enter valid mobile number"),
        }),

        onSubmit: async (values) => {
            const success = await patientlogin({
                mobileNumber: values.mobileNumber,
            });

            if (success) {
                setShowOtpScreen(true);
            }
        },
    });

    const otpFormik = useFormik({
        initialValues: {
            otp: "",
        },

        validationSchema: Yup.object({
            otp: Yup.string()
                .required("OTP is required")
                .length(6, "OTP must be 6 digits"),
        }),

        onSubmit: async (values) => {
            const success = await verifyOtp({
                patientId: sessionStorage.getItem("patientId"),
                otp: values.otp,
            });

            if (success) {
                navigate("/my-reports");
            }
        },
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-600 flex items-center justify-center shadow-lg">
                        <span className="text-3xl text-white font-bold">
                            P
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 mt-4">
                        Patient Portal
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Access your reports securely
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">

                    {!showOtpScreen ? (
                        <>
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Welcome Back 👋
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Enter your registered mobile number
                                </p>
                            </div>

                            <form
                                onSubmit={mobileFormik.handleSubmit}
                                className="space-y-5"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mobile Number
                                    </label>

                                    <input
                                        type="text"
                                        name="mobileNumber"
                                        value={mobileFormik.values.mobileNumber}
                                        onChange={mobileFormik.handleChange}
                                        onBlur={mobileFormik.handleBlur}
                                        placeholder="Enter mobile number"
                                        className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                                    />

                                    {mobileFormik.touched.mobileNumber &&
                                        mobileFormik.errors.mobileNumber && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {mobileFormik.errors.mobileNumber}
                                            </p>
                                        )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all disabled:opacity-50"
                                >
                                    {loading
                                        ? "Sending OTP..."
                                        : "Send OTP"}
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Verify OTP
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Enter the 6-digit OTP sent to your mobile
                                </p>
                            </div>

                            <form
                                onSubmit={otpFormik.handleSubmit}
                                className="space-y-5"
                            >
                                <div>
                                    <input
                                        type="text"
                                        name="otp"
                                        maxLength={6}
                                        value={otpFormik.values.otp}
                                        onChange={otpFormik.handleChange}
                                        onBlur={otpFormik.handleBlur}
                                        placeholder="------"
                                        className="w-full h-14 text-center text-2xl tracking-[10px] border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500"
                                    />

                                    {otpFormik.touched.otp &&
                                        otpFormik.errors.otp && (
                                            <p className="text-red-500 text-sm mt-2">
                                                {otpFormik.errors.otp}
                                            </p>
                                        )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-all disabled:opacity-50"
                                >
                                    {loading
                                        ? "Verifying..."
                                        : "Verify OTP"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowOtpScreen(false);
                                        otpFormik.resetForm();
                                    }}
                                    className="w-full text-blue-600 text-sm font-medium hover:text-blue-700"
                                >
                                    Change Mobile Number
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}