import React, { useState, useEffect } from "react";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="flex flex-row p-5 bg-[#3F72AF] text-[#dae0ef] justify-center gap-3 align-middle">
        <p className="uppercase text-lg font-semibold">
          END OF MONTH SPECIAL: UPTO 40% OFF
        </p>
        <span>|</span>
        <p className="uppercase text-lg font-semibold">
          earn ₹500 for every referral
        </p>
        <span>|</span>
        <p className="uppercase text-lg font-semibold">+5% off on app orders</p>
      </div>
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img src={image} alt={`Slide ${index}`} className="w-full" />
            </div>
          ))}
        </div>

        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white bg-opacity-50 p-2"
          onClick={prevSlide}
        >
          &lt;
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white bg-opacity-50 p-2"
          onClick={nextSlide}
        >
          &gt;
        </button>
      </div>
    </>
  );
};




export default Carousel;
