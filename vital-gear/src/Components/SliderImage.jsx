import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SliderImage() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  
  return (
    <>
      <div className="basis-[40%] w-[500px] flex flex-col gap-5">
        <div>
          <style>
            {`
                .slick-prev,
                .slick-next {
                  color: #112D4E !important;
                }
                
                .slick-next{
                    margin-left: 0px;
                }

                .slick-prev::before,
                .slick-next::before {
                  color: #112D4E !important;
                }
              `}
          </style>
          <Slider {...settings}>
            <div>
              <img src="/products/protein.jpg" alt="" className="rounded-md" />
            </div>
            <div>
              <img src="/products/protein.jpg" alt="" className="rounded-md" />
            </div>
            <div>
              <img src="/products/protein.jpg" alt="" className="rounded-md" />
            </div>
            <div>
              <img src="/products/protein.jpg" alt="" className="rounded-md" />
            </div>
          </Slider>
        </div>
        <div>
          <img src="/products/nutri-info.webp" alt="" />
        </div>
      </div>
    </>
  );
}
