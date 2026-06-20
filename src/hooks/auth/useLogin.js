import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import conf from "../../config/index";
import useFetch from "../useFetch";
import { toast } from "react-toastify";
import { authAtom, patientProfileAtom, patientResAtom } from "../../state/auth/authState";

export default function useLogin() {
    const [fetchData] = useFetch();
    const [loading, setLoading] = useState(false);
    const setAuthState = useSetRecoilState(authAtom);
    const [patientRes, setPatientRes] = useRecoilState(patientResAtom);
    const [patientProfile, setPatientProfile] = useRecoilState(patientProfileAtom);

    const patientlogin = async (data) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}patient-auth/request-otp`,
                data
            });
            if (res) {
                setLoading(false);
                toast.success(res.message + ": " + res.otp);
                sessionStorage.setItem("patientId", res.data.patientId);
                return true;
            }
        } catch (error) {
            console.error("Patient login error:", error);
            toast.error(error.response?.data?.message || "Failed to send OTP");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async (data) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}patient-auth/verify-otp`,
                data
            });
            if (res) {
                setLoading(false);
                setAuthState({ isAuthenticated: true });
                toast.success(res.message);
                sessionStorage.setItem("token", res.token);
                setPatientRes(res.patient);
                return true;
            }
        } catch (error) {
            console.error("OTP verification error:", error);
            toast.error(error.response?.data?.message || "Failed to verify OTP");
            return false;
        }
        finally {
            setLoading(false);
        }
    };

    const fetchPatientProfile = async () => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}patient-auth/profile`
            });
            if (res) {
                setLoading(false);
                setPatientProfile(res.patient);
                return true;
            }
        } catch (error) {
            console.error("Fetch patient profile error:", error);
            toast.error(error.response?.data?.message || "Failed to fetch patient profile");
            return false;
        }   
        finally {
            setLoading(false);
        }
    };

    const resetPatientProfile = () => {
        setPatientProfile(null)
    }

    return { patientlogin, verifyOtp, loading, patientRes,
        patientProfile, fetchPatientProfile, resetPatientProfile
     }
};