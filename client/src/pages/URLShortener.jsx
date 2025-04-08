import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import { MdOutlineQrCode } from "react-icons/md";
import { FaYoutube, FaTwitter, FaVimeo, FaImage } from "react-icons/fa";
// import Hero from "../components/Hero";
import { useGetUrlsQuery, useCreateShortUrlMutation } from "../services/urlApi";
const URLShortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");

  const { data: urls = [], isLoading } = useGetUrlsQuery();
  const [createShortUrl] = useCreateShortUrlMutation();

  // let isExpired;

  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split('-');
    const date = new Date(`${year}-${month}-${day}`);
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl.trim()) return;
    try {
      const shortUrl = await createShortUrl(originalUrl).unwrap();
      console.log(shortUrl);
      setOriginalUrl("");
    } catch (err) {
      console.error("Failed to shorten:", err);
    }
  };

  console.log(urls.formattedUrls);

  // const links = [
  //   {
  //     id: 1,
  //     short: "https://linkly.com/Bn41cDfmj",
  //     original: "https://www.twitter.com/tweets/8serCo4hu/",
  //     icon: <FaTwitter className="text-blue-400" />,
  //     qr: true,
  //     clicks: 1313,
  //     status: "Active",
  //     date: "Oct - 10 - 2023",
  //   },
  //   {
  //     id: 2,
  //     short: "https://linkly.com/Bn41cDfmj",
  //     original: "https://www.youtube.com/watch?v=8J72fmH04kk",
  //     icon: <FaYoutube className="text-red-500" />,
  //     qr: true,
  //     clicks: 45138,
  //     status: "Inactive",
  //     date: "Oct - 08 - 2023",
  //   },
  //   {
  //     id: 3,
  //     short: "https://linkly.com/Bn41cDfmj",
  //     original: "https://www.adventuremistandretlust.com",
  //     icon: <BiLinkExternal />,
  //     qr: true,
  //     clicks: 1813,
  //     status: "Active",
  //     date: "Sep - 29 - 2023",
  //   },
  //   {
  //     id: 4,
  //     short: "https://linkly.com/Bn41cDfmj",
  //     original: "https://vimeo.com/652637654",
  //     icon: <FaVimeo className="text-blue-300" />,
  //     qr: true,
  //     clicks: 1203,
  //     status: "Active",
  //     date: "Sep - 19 - 2023",
  //   },
  //   {
  //     id: 5,
  //     short: "https://linkly.com/Bn41cDfmj",
  //     original: "https://unsplash.com/photos/2jKfXwQzFiVQ",
  //     icon: <FaImage className="text-pink-300" />,
  //     qr: true,
  //     clicks: 1423,
  //     status: "Active",
  //     date: "Sep - 18 - 2023",
  //   },
  // ];

  isLoading && (
    <div className="text-center text-2xl text-gray-400">Loading...</div>
  );
  return (
    <div className="text-white min-h-screen font-sans">
      {/* <Hero /> */}
      <div className="text-center px-4 py-20 mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          <span className="text-blue-500">Shorten</span> your{" "}
          <span className="text-pink-500">Loooong Links</span> in seconds 🚀
        </h1>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          A modern, fast, and reliable URL shortener built to make sharing
          easier.
        </p>
        <div className="mt-8 flex flex-col  justify-center items-center gap-4">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Paste your URL here..."
              className="w-80 sm:w-[400px] px-4 py-2 rounded-full bg-[#1A1C2B] text-white border border-gray-600 focus:outline-none"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
            />
            <p className="mt-4 text-gray-400 max-w-xl mx-auto">
              Create personalized and memorable links for your URLs (Optional)
            </p>
            <input
              type="text"
              placeholder="Your personalized code"
              className="w-50  px-4 py-2  bg-[#1A1C2B] text-white border border-gray-600 focus:outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full cursor-pointer">
              Shorten URL
            </button>
          </form>
        </div>
        <div className="pt-20 mt-10"></div>
      </div>

      {/* Table */}
      <div className=" px-6 overflow-x-auto mb-10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="py-2">Short Link</th>
              <th className="py-2">Original Link</th>
              <th className="py-2">QR Code</th>
              <th className="py-2">Clicks</th>
              <th className="py-2">Status</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {urls?.formattedUrls?.map((link) => (
              //  isExpired = (new Date() - new Date(link.createdAt) > 30 * 24 * 60 * 60 * 1000),
              <tr key={link?.id} className="border-b border-gray-800">
                <td className="py-3 text-blue-400">
                  {link?.shortUrl}
                  <span className="inline-flex pl-2 text-white">
                    <FaCopy />
                  </span>{" "}
                </td>

                <td className="py-3 flex items-center ">
                  {/* {link.icon}{" "} */}
                  <a
                    href={link?.originalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-300 hover:underline"
                  >
                    {link?.originalUrl}
                  </a>
                </td>
                <td className="py-3">
                  {/* {link.qr && <MdOutlineQrCode className="text-2xl ml-3" />} */}
                  {<MdOutlineQrCode className="text-2xl ml-3" />}
                </td>
                <td className="py-3">{link?.clicks}</td>
                <td className="py-3">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      link?.status === "Active"
                        ? "bg-green-800 text-green-300"
                        : "bg-yellow-700 text-yellow-300"
                    }`}
                  >
                    active
                    {/* {isExpired ? 'inactive' : 'active'}                   } */}
                  </span>
                </td>
                <td className="py-3 text-gray-400">{formatDate(link?.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default URLShortener;
