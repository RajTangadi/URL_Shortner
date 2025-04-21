import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AnalyticsDashboard from "../components/AnalyticsDashboard";

const UrlDetails = () => {
  const { shortUrl } = useParams();
  const [urlData, setUrlData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUrlData = async () => {
      try {
        const response = await axios.get(`/api/urls/${shortUrl}`);
        setUrlData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch URL details");
        setLoading(false);
      }
    };

    fetchUrlData();
  }, [shortUrl]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!urlData) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4">URL Details</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Original URL
            </label>
            <p className="mt-1 text-sm text-gray-900 break-all">
              {urlData.originalUrl}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Short URL
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {window.location.origin}/{urlData.shortUrl}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Created At
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(urlData.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <AnalyticsDashboard shortUrl={shortUrl} />
    </div>
  );
};

export default UrlDetails;
