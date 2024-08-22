// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-static-element-interactions */
// import React, {useEffect, useRef, useState} from 'react';

import React from 'react';

export const CAROUSAL_IMAGES = [
  {
    NAME: 'Watches',
    QUANTITY: '12',
    IMAGE: '/splash/carousal-watch.png',
  },
  {
    NAME: 'Bracelets',
    QUANTITY: '16',
    IMAGE: '/splash/carousal-bracelet.png',
  },
  {
    NAME: 'T-Shirt',
    QUANTITY: '8',
    IMAGE: '/splash/carousal-shirt.png',
  },
];

const Carousal = ({handleCarouselProduct}) => {
  const handleSelectedProduct = (selectedProduct) => {
    handleCarouselProduct(selectedProduct);
  };

  // Specify the type for the ref
  //   const wrapperRef = useRef<HTMLDivElement | null>(null);
  //   const [isHovered, setIsHovered] = useState(false);

  //   useEffect(() => {
  //     const wrapper = wrapperRef.current;

  //     if (!wrapper) return;

  //     let animationId: number;

  //     const startAnimation = () => {
  //       wrapper.style.animationPlayState = 'running';
  //       animationId = requestAnimationFrame(startAnimation);
  //     };

  //     const stopAnimation = () => {
  //       wrapper.style.animationPlayState = 'paused';
  //       cancelAnimationFrame(animationId);
  //     };

  //     if (isHovered) {
  //       stopAnimation();
  //     } else {
  //       startAnimation();
  //     }

  //     return () => cancelAnimationFrame(animationId);
  //   }, [isHovered]);

  return (
    <>
      <div className="container flex w-full h-[60px] overflow-x-auto mt-2">
        <div
          className="carousal-wrapper flex gap-3"
          //   ref={wrapperRef}
          //   onMouseEnter={() => setIsHovered(true)}
          //   onMouseLeave={() => setIsHovered(false)}
          style={
            {
              // animation: `slide 18s linear infinite`,
              // whiteSpace: 'nowrap',
            }
          }
        >
          {/* Carousel of products */}
          {CAROUSAL_IMAGES.map((prdct, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
              key={index}
              className="product relative  min-w-[128px] min-h-[60px]  "
              onClick={() => handleSelectedProduct(index)}
            >
              <div className="prdct-detail flex justify-around items-center h-[51px] mt-[7px] bg-[#000000] rounded-[6px] shadow-xl">
                {/* prdct image */}
                <img src={prdct.IMAGE} alt="watch" className="z-40" />
                {/* prdct detail */}
                <div className="prdct-detail flex flex-col justify-between">
                  <h4 className="text-[#DAAF37] text-[12px] ">
                    {prdct.QUANTITY} left
                  </h4>
                  <h2 className="text-[#ECECEC] text-[14px] leading-[18px] font-bold font-avenir">
                    {prdct.NAME}
                  </h2>
                </div>
              </div>
              {/* left side mask */}
              <div className="mask absolute left-[-2] top-[-1px]">
                <img src="/splash/carousal-mask.png" alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Include CSS in JS styles directly within the component */}
      {/* <style>
        {`
          @keyframes slide {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(-100%);
            }
          }

          .carousal-wrapper {
            animation: slide 20s linear infinite;
          }
        `}
      </style> */}
    </>
  );
};

export default Carousal;
