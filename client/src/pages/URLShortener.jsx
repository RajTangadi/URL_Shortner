import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { MdOutlineQrCode } from "react-icons/md";
import { useGetUrlsQuery, useCreateShortUrlMutation } from "../services/urlApi";
import { Slide, toast } from "react-toastify";
import { QRCodeSVG } from "qrcode.react";

const URLShortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [qrModalUrl, setQrModalUrl] = useState(null);

  const { data: urls = [], isLoading } = useGetUrlsQuery();
  const [createShortUrl, { isLoading: isCreating }] =
    useCreateShortUrlMutation();

  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split("-");
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl.trim()) return;
    try {
      const shortUrl = await createShortUrl({
        originalUrl,
        shortCode,
      }).unwrap();
      toast.success("Short url created successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Slide,
      });
      setOriginalUrl("");
      setShortCode("");
    } catch (err) {
      toast.error("Failed to shorten", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Slide,
      });
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1000);
  };

  return (
    <div className="min-h-screen bg-[#0E0F1A] text-white px-4 py-10 font-sans">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          <span className="text-blue-500">Shorten</span> your{" "}
          <span className="text-pink-500">Loooong Links</span> in seconds 🚀
        </h1>
        <p className="mt-4 text-gray-400">
          A modern, fast, and reliable URL shortener built to make sharing
          easier.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 max-w-3xl mx-auto bg-[#1A1C2B] p-6 rounded-xl shadow-md flex flex-col sm:flex-row gap-4 items-stretch"
      >
        <input
          type="text"
          placeholder="Paste your URL here..."
          className="flex-1 px-4 py-2 rounded-full bg-[#1A1C2B] text-white border border-gray-600 focus:outline-none"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Custom code (optional)"
          value={shortCode}
          onChange={(e) => setShortCode(e.target.value)}
          className="flex-1 px-4 py-2 rounded-full bg-[#1A1C2B] text-white border border-gray-600 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all"
        >
          {isCreating ? "Shortening..." : "Shorten"}
        </button>
      </form>

      {isLoading && (
        <div className="text-center text-lg text-gray-400 mt-6">Loading...</div>
      )}

      {/* Table */}
      {!isLoading && (
        <div className="mt-16 overflow-x-auto">
          <table className="w-full min-w-[800px] text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="py-3 px-4">Short Link</th>
                <th className="py-3 px-4">Original Link</th>
                <th className="py-3 px-4">QR Code</th>
                <th className="py-3 px-4">Clicks</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {urls?.formattedUrls?.map((link) => {
                const createdDate = new Date(link?.createdAt);
                const now = new Date();
                const isExpired = now - createdDate > 30 * 24 * 60 * 60 * 1000;
                const statusText = isExpired ? "Inactive" : "Active";
                const statusClass = isExpired
                  ? "bg-yellow-700 text-yellow-300"
                  : "bg-green-800 text-green-300";

                return (
                  <tr
                    key={link?.id}
                    className="border-b border-gray-800 hover:bg-[#1f2236] transition-all"
                  >
                    <td className="py-3 px-4 text-blue-400 flex items-center gap-2">
                      <a href={link?.shortUrl} target="_blank" rel="noreferrer">
                        {link?.shortUrl}
                      </a>
                      <span
                        className="cursor-pointer relative"
                        onClick={() => handleCopy(link?.id, link?.shortUrl)}
                      >
                        <FaCopy className="text-white hover:opacity-40" />
                        {copiedId === link?.id && (
                          <span className="absolute top-[-24px] left-[-10px] text-xs bg-black text-white px-2 py-1 rounded">
                            Copied!
                          </span>
                        )}
                      </span>
                    </td>

                    <td className="py-3 px-4 max-w-xs truncate">
                      <a
                        href={link?.originalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-300 hover:underline"
                      >
                        {link?.originalUrl}
                      </a>
                    </td>

                    <td className="py-3 px-4 lg:px-10">
                      <MdOutlineQrCode
                        className="text-2xl cursor-pointer hover:text-gray-300"
                        onClick={() => setQrModalUrl(link?.originalUrl)}
                      />
                    </td>

                    <td className="py-3 px-4">{link?.clicks}</td>

                    <td className="py-3 px-4">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${statusClass}`}
                      >
                        {statusText}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-gray-400">
                      {formatDate(link?.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* QR Code Modal */}
      {qrModalUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          onClick={() => setQrModalUrl(null)}
        >
          <div
            className="bg-[#1A1C2B] p-6 rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4 text-center">QR Code</h2>
            <QRCodeSVG value={qrModalUrl} size={200} />
            <p className="mt-4 text-center text-sm text-gray-400 break-all">
              {qrModalUrl}
            </p>
            <button
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded"
              onClick={() => setQrModalUrl(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default URLShortener;
