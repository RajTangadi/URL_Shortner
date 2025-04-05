const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4">
      <h1 className="text-2xl font-bold text-gradient">Linkly</h1>
      <div className="space-x-3">
        <button className="text-sm px-3 py-1 border border-gray-800 rounded-full ">
          Login
        </button>
        <button className="text-sm text-white px-4 py-1 bg-blue-600 rounded-full hover:bg-blue-700">
          Register Now
        </button>
      </div>
    </div>
  );
};

export default Navbar;
