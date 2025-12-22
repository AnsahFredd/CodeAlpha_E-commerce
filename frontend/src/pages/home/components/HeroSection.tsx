import heroImage from 'src/assets/images/home/headerimage.png';

const HeroSection = () => {
  return (
    <div className="min-h-screen w-full bg-linear-to-r from-indigo-600 via-purple-600 to-purple-500 px-4 py-8 sm:px-8 sm:py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 lg:flex-row">
        <div className="flex-1 space-y-6 text-center text-white lg:text-left">
          <span className="bg-opacity-20 inline-block rounded-full bg-violet-300 px-6 py-2 text-sm font-medium backdrop-blur-sm">
            New Collection Available
          </span>

          <h1 className="text-4xl leading-tight font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            Discover Your Style
          </h1>

          <p className="text-opacity-90 mx-auto max-w-xl text-lg text-white lg:mx-0">
            Shop the latest trends in fashion, electronics, and lifestyle
            products. Quality guaranteed, prices unbeatable.
          </p>

          <div className="flex justify-center gap-4 pt-4 lg:justify-start">
            <button className="hover:bg-opacity-90 flex cursor-pointer items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-purple-600 transition">
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

            <button className="cursor-pointer rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-purple-600">
              View Featured
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex flex-1 justify-center lg:justify-end">
          <img
            src={heroImage}
            alt="Featured Collection"
            className="h-auto w-full max-w-lg rounded-2xl object-cover shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
