import React from "react";
import { BiLeaf } from "react-icons/bi";
import { BiSolidFlask } from "react-icons/bi";
import { BiBadgeCheck } from "react-icons/bi";
import { BiStar } from "react-icons/bi";

export default function Features() {
  return (
    <>
      <div className="flex flex-row gap-32 p-[7rem] items-center">
        <div>
          <img
            src="/features-img.webp"
            alt="supplement-stack"
            className="w-[800px] h-[400px] rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-10">
          <p className="uppercase font-extrabold text-4xl text-[#09274d]">
            VitalGear Supplement Features
          </p>

          <p className="text-lg text-[#798091]">
            Our supplements are expertly crafted with the highest standards of
            quality and efficacy, ensuring optimal performance and results.
          </p>
          <div className="text-lg font-semibold flex flex-row gap-20 text-[#09274d] items-center">
            <p className="">
              <BiLeaf className="text-4xl text-center" /> Premium Ingredients
            </p>
            <p>
              <BiSolidFlask className="text-4xl" />
              Enhanced Formulas
            </p>
            <p>
              <BiBadgeCheck className="text-4xl" />
              Proven Efficiency
            </p>
            <p>
              <BiStar className="text-4xl" />
              Innovative Blends
            </p>
          </div>

          <div className="text-lg font-semibold flex flex-row gap-32 text-[#09274d] items-center"></div>
          <p className="text-lg text-[#798091]">
            Experience the best in health and fitness with our meticulously
            developed products designed to support your journey.
          </p>
          <div className="flex flex-row gap-32 justify-center">
            <button className="bg-[#09274d] text-xl text-[#dae0ef] font-semibold p-5 rounded-full hover:bg-[#dae0ef] hover:text-[#09274d] duration-500">
              Shop Now
            </button>
            <button className="bg-[#09274d] text-xl text-[#dae0ef] font-semibold p-5 rounded-full hover:bg-[#dae0ef] hover:text-[#09274d] duration-500">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
