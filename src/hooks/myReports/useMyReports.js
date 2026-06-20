import { useState } from "react";
import { useRecoilState } from "recoil";
import conf from "../../config/index";
import useFetch from "../useFetch";
import { toast } from "react-toastify";
import { reportsAtom, reportsDetailsAtom } from "../../state/myReports/myReportState";

export default function useMyReports() {
    const [fetchData] = useFetch();
    const [loading, setLoading] = useState(false);
    const [reports, setReports] = useRecoilState(reportsAtom);
    const [reportsDetails, setReportsDetails] = useRecoilState(reportsDetailsAtom);

    const fetchReports = async (date, reportName) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (date) params.append("date", date);
            if (reportName) params.append("reportName", reportName);
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}patient-auth/reports?${params.toString()}`
            });
            if (res) {
                setLoading(false);
                setReports(res.data);
                return true;
            }
        } catch (error) {
            console.error("Fetch reports error:", error);
            return false;
        }
        finally {    
          setLoading(false);
        }
    };

    const fetchReportDetails = async (id) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}patient-auth/reports/${id}`
            });
            if (res) {
                setLoading(false);
                setReportsDetails(res.data);
                return true;
            }
        } catch (error) {
            console.error("Fetch report details error:", error);
            return false;
        }
        finally {
          setLoading(false);
        }
    };

    const resetReportDetails = () => {
        setReportsDetails(null);
    };

    return {
        loading,
        reports,
        reportsDetails,
        fetchReports,
        fetchReportDetails,
        resetReportDetails
    };
    }