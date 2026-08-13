import React, { useEffect } from "react";
import useMyReports from "../../hooks/myReports/useMyReports";

export default function MyReports() {
  const { reports, fetchReports, loading } = useMyReports();

  useEffect(() => {
    fetchReports();
  }, []);

  const handleView = (imageUrl) => {
    window.open(imageUrl, "_blank");
  };

  const handleDownload = async (imageUrl, index) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `report-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

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

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-2xl p-8 text-center">
          <i className="pi pi-spin pi-spinner text-3xl text-blue-500"></i>
          <p className="mt-3 text-gray-500">Loading reports...</p>
        </div>
      )}

      {/* Reports List */}
      {!loading && (
        <div className="space-y-4">
          {reports?.length > 0 ? (
            reports.map((imageUrl, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4"
              >
                <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-100 mb-4">
                  <img
                    src={imageUrl}
                    alt={`Report ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Report {index + 1}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(imageUrl)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors"
                    >
                      <i className="pi pi-eye"></i>
                      View
                    </button>
                    <button
                      onClick={() => handleDownload(imageUrl, index)}
                      className="px-4 py-2 border border-blue-600 text-blue-600 rounded-xl flex items-center gap-2 hover:bg-blue-50 transition-colors"
                    >
                      <i className="pi pi-download"></i>
                      Download
                    </button>
                  </div>
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
      )}
    </div>
  );
}
