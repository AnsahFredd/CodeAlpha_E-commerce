import heroImage from "src/assets/images/home/headerimage.png";

const HeroSection = () => {
  return (
    <div className="min-h-screen w-full bg-linear-to-r from-indigo-600 via-purple-600 to-purple-500 px-8 py-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1 text-white space-y-6">
          <span className="inline-block px-6 py-2 bg-violet-300 bg-opacity-20 rounded-full text-sm font-medium backdrop-blur-sm">
            New Collection Available
          </span>

          <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
            Discover Your Style
          </h1>

          <p className="text-lg text-white text-opacity-90 max-w-xl">
            Shop the latest trends in fashion, electronics, and lifestyle
            products. Quality guaranteed, prices unbeatable.
          </p>

          <div className="flex gap-4 pt-4">
            <button className="px-8 py-3 bg-white text-purple-600  cursor-pointer rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center gap-2">
              Shop Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold cursor-pointer hover:bg-white hover:text-purple-600 transition">
              View Featured
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src={heroImage}
            alt="Featured Collection"
            className="w-full max-w-lg h-auto rounded-2xl shadow-2xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
