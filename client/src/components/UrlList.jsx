import { Link } from "react-router-dom";

{
  urls.map((url) => (
    <div key={url._id} className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm text-gray-500">Original URL</p>
          <p className="text-sm break-all">{url.originalUrl}</p>
          <p className="text-sm text-gray-500 mt-2">Short URL</p>
          <p className="text-sm">
            {window.location.origin}/{url.shortUrl}
          </p>
        </div>
        <Link
          to={`/urls/${url.shortUrl}`}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          View Analytics
        </Link>
      </div>
    </div>
  ));
}
