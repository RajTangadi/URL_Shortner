import React from "react";

function Hero() {
  return (
    <section className="text-center px-4 py-20 mb-10">
      <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
        <span className="text-blue-500">Shorten</span> your{" "}
        <span className="text-pink-500">Loooong Links</span> in seconds 🚀
      </h1>
      <p className="mt-4 text-gray-400 max-w-xl mx-auto">
        A modern, fast, and reliable URL shortener built to make sharing easier.
      </p>
      <div className="mt-8 flex flex-col  justify-center items-center gap-4">
        <input
          type="text"
          placeholder="Paste your URL here..."
          className="w-80 sm:w-[400px] px-4 py-2 rounded-full bg-[#1A1C2B] text-white border border-gray-600 focus:outline-none"
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
      </div>
      <div className="pt-20 mt-10">

      </div>
    </section>
  );
}

export default Hero;
