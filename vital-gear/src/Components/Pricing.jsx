import React from "react";

export const Pricing = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-[#DBE2EF] uppercase rounded-full bg-[#3f72af]">
            Our Pricing
          </p>
        </div>
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-[#112D4E] sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="7e5e8ff8-1960-4094-a63a-2a0c0f922d69"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#7e5e8ff8-1960-4094-a63a-2a0c0f922d69)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative">Popular</span>
          </span>{" "}
          Supplement Packages
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          Supplements are meticulously formulated with a focus on quality.
        </p>
      </div>
      <div className="grid max-w-md gap-10 row-gap-5 lg:max-w-screen-lg sm:row-gap-10 lg:grid-cols-3 xl:max-w-screen-lg sm:mx-auto">
        <div className="flex flex-col justify-between p-8 transition-shadow duration-300 text-[#112D4E] bg-[#DBE2EF] border rounded-md shadow-sm sm:items-center hover:shadow">
          <div className="text-center">
            <div className="text-lg font-semibold">Bulk</div>
            <div className="flex items-center justify-center mt-2">
              <div className="mr-1 text-5xl font-bold">₹5999</div>
              <div className="">/ mo</div>
            </div>
            <div className="mt-2 space-y-3">
              <div className="">1 Whey Protein</div>
              <div className="">1 Creatine</div>
              <div className="">1 Mass Gainer</div>
            </div>
          </div>
          <div>
            <a
              href="/"
              className="inline-flex items-center justify-center w-full h-12 px-6 mt-6 font-medium tracking-wide text-white transition duration-200 bg-gray-800 rounded shadow-md hover:bg-gray-900 focus:shadow-outline focus:outline-none"
            >
              Buy Now
            </a>
            <p className="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto">
              Ideal for individuals looking to gain muscle mass and strength.
              This package includes essential supplements to support muscle
              growth and recovery.
            </p>
          </div>
        </div>
        <div className="relative flex flex-col justify-between p-8 transition-shadow duration-300 bg-[#DBE2EF] text-[#112D4E] border rounded shadow-sm sm:items-center hover:shadow border-[#112D4E]">
          <div className="absolute inset-x-0 top-0 flex justify-center -mt-3">
            <div className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-white uppercase rounded bg-[#112D4E]">
              Most Popular
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">Lean Bulk</div>
            <div className="flex items-center justify-center mt-2">
              <div className="mr-1 text-5xl font-bold">₹7999</div>
              <div className="text-gray-700">/ mo</div>
            </div>
            <div className="mt-2 space-y-3">
              <div className="">1 Whey Protein</div>
              <div className="">1 Creatine</div>
              <div className="">1 Multi-Vitamin</div>
              <div className="">1 BCAA</div>
            </div>
          </div>
          <div>
            <a
              href="/"
              className="inline-flex items-center justify-center w-full h-12 px-6 mt-6 font-medium tracking-wide text-white transition duration-200 bg-gray-800 rounded shadow-md hover:bg-gray-900 focus:shadow-outline focus:outline-none"
            >
              Buy Now
            </a>
            <p className="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto">
              Perfect for those aiming to build lean muscle without adding
              excess fat. This stack provides the necessary nutrients to enhance
              muscle synthesis and overall health.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between p-8 transition-shadow duration-300 bg-[#DBE2EF] text-[#112D4E] border rounded shadow-sm sm:items-center hover:shadow">
          <div className="text-center">
            <div className="text-lg font-semibold">Fat Loss</div>
            <div className="flex items-center justify-center mt-2">
              <div className="mr-1 text-5xl font-bold">₹8499</div>
              <div className="text-gray-700">/ mo</div>
            </div>
            <div className="mt-2 space-y-3">
              <div className="">1 Whey Protein Isolate</div>
              <div className="">1 Fat Burner</div>
              <div className="">1 Multi-Vitamin</div>
              <div className="">1 L-Carnitine</div>
            </div>
          </div>
          <div>
            <a
              href="/"
              className="inline-flex items-center justify-center w-full h-12 px-6 mt-6 font-medium tracking-wide text-white transition duration-200 bg-gray-800 rounded shadow-md hover:bg-gray-900 focus:shadow-outline focus:outline-none"
            >
              Buy Now
            </a>
            <p className="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto">
              Designed for individuals focused on losing fat while maintaining
              muscle. This package includes supplements to boost metabolism,
              support fat loss, and improve energy levels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
