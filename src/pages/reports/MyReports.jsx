import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMyReports from "../../hooks/myReports/useMyReports";

export default function MyReports() {
  const { reports, fetchReports } = useMyReports();
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          My Reports
        </h1>
        <p className="text-sm text-gray-500">
          View all your uploaded medical reports
        </p>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports?.length > 0 ? (
          reports.map((report) => (
            <div
              key={report._id}
              onClick={() => navigate(`/report/${report._id}`)}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 cursor-pointer hover:shadow-md transition-all"
            >
              {/* Top Section */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500">
                    Report Date
                  </p>

                  <h3 className="font-semibold text-gray-800">
                    {report.dateOfReport}
                  </h3>
                </div>

                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <i className="pi pi-file text-blue-600"></i>
                </div>
              </div>

              {/* Report Types */}
              <div className="mt-4 flex flex-wrap gap-2">
                {report.reportNames?.map((name, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700 border border-blue-100"
                  >
                    {name}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {report.reportNames?.length} Report
                  {report.reportNames?.length > 1 ? "s" : ""}
                </span>

                <span className="text-blue-600 text-sm font-medium flex items-center gap-1">
                  View
                  <i className="pi pi-arrow-right"></i>
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <i className="pi pi-file text-4xl text-gray-300"></i>

            <h3 className="mt-3 text-lg font-semibold text-gray-700">
              No Reports Found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Your medical reports will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}