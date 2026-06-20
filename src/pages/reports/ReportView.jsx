import React, { useEffect } from "react";
import useMyReports from "../../hooks/myReports/useMyReports";
import { useParams } from "react-router-dom";

export default function ReportView() {
  const {
    reportsDetails,
    fetchReportDetails,
    resetReportDetails
  } = useMyReports();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchReportDetails(id);
    }

    return () => resetReportDetails();
  }, [id]);

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
          Object.entries(reportsDetails).map(
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
                    className="flex-1 h-11 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2"
                  >
                    <i className="pi pi-eye"></i>
                    View
                  </a>

                  <a
                    href={reportUrl}
                    download
                    className="flex-1 h-11 border border-blue-600 text-blue-600 rounded-xl flex items-center justify-center gap-2"
                  >
                    <i className="pi pi-download"></i>
                    Download
                  </a>
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