import React from 'react'
import { FaCopy } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import { MdOutlineQrCode } from "react-icons/md";
import { FaYoutube, FaTwitter, FaVimeo, FaImage } from "react-icons/fa";
import Hero from '../components/Hero';
const URLShortener = () => {

    const links = [
        {
          id: 1,
          short: "https://linkly.com/Bn41cDfmj",
          original: "https://www.twitter.com/tweets/8serCo4hu/",
          icon: <FaTwitter className="text-blue-400" />,
          qr: true,
          clicks: 1313,
          status: "Active",
          date: "Oct - 10 - 2023",
        },
        {
          id: 2,
          short: "https://linkly.com/Bn41cDfmj",
          original: "https://www.youtube.com/watch?v=8J72fmH04kk",
          icon: <FaYoutube className="text-red-500" />,
          qr: true,
          clicks: 45138,
          status: "Inactive",
          date: "Oct - 08 - 2023",
        },
        {
          id: 3,
          short: "https://linkly.com/Bn41cDfmj",
          original: "https://www.adventuremistandretlust.com",
          icon: <BiLinkExternal />,
          qr: true,
          clicks: 1813,
          status: "Active",
          date: "Sep - 29 - 2023",
        },
        {
          id: 4,
          short: "https://linkly.com/Bn41cDfmj",
          original: "https://vimeo.com/652637654",
          icon: <FaVimeo className="text-blue-300" />,
          qr: true,
          clicks: 1203,
          status: "Active",
          date: "Sep - 19 - 2023",
        },
        {
          id: 5,
          short: "https://linkly.com/Bn41cDfmj",
          original: "https://unsplash.com/photos/2jKfXwQzFiVQ",
          icon: <FaImage className="text-pink-300" />,
          qr: true,
          clicks: 1423,
          status: "Active",
          date: "Sep - 18 - 2023",
        },
      ];

  return (
    <div className="text-white min-h-screen font-sans">
      <Hero />

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
            {links.map((link) => (
              <tr key={link.id} className="border-b border-gray-800">
                <td className="py-3 text-blue-400">{link.short} <span className='inline-flex pl-2 text-white'><FaCopy /></span> </td>
                
                <td className="py-3 flex items-center ">
                  {link.icon}{" "}
                  <a href={link.original} target="_blank" rel="noreferrer" className="text-gray-300 hover:underline">
                    {link.original}
                  </a>
                </td>
                <td className="py-3">
                  {link.qr && <MdOutlineQrCode className="text-2xl ml-3" />}
                </td>
                <td className="py-3">{link.clicks}</td>
                <td className="py-3">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      link.status === "Active" ? "bg-green-800 text-green-300" : "bg-yellow-700 text-yellow-300"
                    }`}
                  >
                    {link.status}
                  </span>
                </td>
                <td className="py-3 text-gray-400">{link.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
   </div>

  )
}

export default URLShortener
