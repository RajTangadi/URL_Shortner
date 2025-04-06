import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex justify-between items-center px-6 py-4 text-white">
      <Link to="/">
        {" "}
        <h1 className="text-2xl font-bold text-gradient">Linkly</h1>
      </Link>
      <div className="space-x-3">
        {currentUser ? (
          <Link to="/profile">
            <img
              src={currentUser.avatar}
              alt="profile"
              className="rounded-full h-7 w-7 object-cover"
            />
          </Link>
        ) : (
          <Link to="/sign-in">
          <li className="sm:inline text-white hover:underline cursor-pointer">
            Login
          </li>
          </Link>
        )}
        {/* <button className="text-sm px-3 py-1 border border-gray-800 rounded-full ">
          Login
        </button>

        <button className="text-sm text-white px-4 py-1 bg-blue-600 rounded-full hover:bg-blue-700">
          Register Now
        </button> */}
      </div>
    </div>
  );
};

export default Navbar;
