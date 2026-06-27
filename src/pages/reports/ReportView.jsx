import React, { useEffect } from "react";
import useMyReports from "../../hooks/myReports/useMyReports";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ReportView() {
  const {
    reportsDetails,
    fetchReportDetails,
    resetReportDetails,
    reportDownload,
    downloadLoading
  } = useMyReports();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchReportDetails(id);
    }

    return () => resetReportDetails();
  }, [id]);

  const downloadFile = async (url, filename) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      return true;
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }
  };

  const handleDownload = async (medicalInformationId, reportName, reportUrl) => {
    try {
      console.log("Starting download for:", { medicalInformationId, reportName, reportUrl });
      
      // Call the API to get the download URL
      const response = await reportDownload(medicalInformationId);
      console.log("API Response:", response);
      
      if (response && response.data) {
        console.log("Response data:", response.data);
        
        // Check if response has reports object
        if (response.data.reports && response.data.reports[reportName]) {
          const downloadUrl = response.data.reports[reportName];
          console.log("Download URL:", downloadUrl);
          
          // Download the file
          await downloadFile(downloadUrl, `${reportName}.pdf`);
          toast.success(`${reportName} downloaded successfully!`);
        } else {
          console.error("Report not found in response:", response.data);
          toast.error("Report URL not found in response");
        }
      } else {
        console.error("Invalid response:", response);
        toast.error("Failed to get download URL from API");
      }
    } catch (error) {
      console.error("Download error:", error);
      toast.error(`Error downloading report: ${error.message}`);
    }
  };

  // Alternative: Direct download without API call (if you already have the URL)
  const handleDirectDownload = async (reportUrl, reportName) => {
    try {
      console.log("Direct download:", { reportUrl, reportName });
      await downloadFile(reportUrl, `${reportName}.pdf`);
      toast.success(`${reportName} downloaded successfully!`);
    } catch (error) {
      console.error("Direct download error:", error);
      toast.error(`Failed to download: ${error.message}`);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Report Details
        </h1>

        <p className="text-sm text-gray-500">
          View and download your medical reports
        </p>
      </div>

      {/* Report Cards */}
      <div className="space-y-4">
        {reportsDetails &&
          reportsDetails.reports && 
          Object.entries(reportsDetails.reports).map(
            ([reportName, reportUrl]) => (
              <div
                key={reportName}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <i className="pi pi-file-pdf text-red-500 text-xl"></i>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {reportName}
                      </h3>

                      <p className="text-xs text-gray-500">
                        PDF Report
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-3">
                  <a
                    href={reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 h-11 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                  >
                    <i className="pi pi-eye"></i>
                    View
                  </a>

                  <button
                    onClick={() => handleDownload(
                      reportsDetails.medicalInformationId, 
                      reportName, 
                      reportUrl
                    )}
                    disabled={downloadLoading}
                    className="flex-1 h-11 border border-blue-600 text-blue-600 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {downloadLoading ? (
                      <>
                        <i className="pi pi-spin pi-spinner"></i>
                        Downloading...
                      </>
                    ) : (
                      <>
                        <i className="pi pi-download"></i>
                        Download
                      </>
                    )}
                  </button>
                </div>

                {/* Debug info - remove in production */}
                <div className="mt-2 text-xs text-gray-400">
                  <p>Report URL: {reportUrl.substring(0, 50)}...</p>
                </div>
              </div>
            )
          )}
      </div>

      {!reportsDetails && (
        <div className="bg-white rounded-2xl p-8 text-center">
          <i className="pi pi-spin pi-spinner text-3xl text-blue-500"></i>

          <p className="mt-3 text-gray-500">
            Loading reports...
          </p>
        </div>
      )}
    </div>
  );
}