import { useEffect, useState } from "react";
import useMyReports from "../../hooks/myReports/useMyReports";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import downloadReportPdf from "../../utils/downloadReportPdf";

export default function ReportView() {
  const {
    reportsDetails,
    fetchReportDetails,
    resetReportDetails,
  } = useMyReports();

  const { id } = useParams();
  const [downloadLoading, setDownloadLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchReportDetails(id);
    }

    return () => resetReportDetails();
  }, [fetchReportDetails, id, resetReportDetails]);

  const handleDownload = async (_medicalInformationId, reportName, reportUrl) => {
    setDownloadLoading(true);
    try {
      await downloadReportPdf(reportUrl, reportName);
      toast.success(`${reportName} downloaded as PDF.`);
    } catch (error) {
      console.error("Download error:", error);
      toast.error(error.message || "Could not download the report as PDF.");
    } finally {
      setDownloadLoading(false);
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