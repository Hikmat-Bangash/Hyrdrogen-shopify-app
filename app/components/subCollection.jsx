// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-static-element-interactions */
// import React, {useEffect, useRef, useState} from 'react';

import React from 'react';

const SubCollectionCarousal = ({handleCarouselProduct, products}) => {
  const handleSelectedProduct = (selectedProduct) => {
    handleCarouselProduct(selectedProduct);
  };

  return (
    <>
      <div className="container flex w-full h-[50px] overflow-x-auto mt-3">
        <div className="carousal-wrapper flex gap-3">
          {/* Carousel of products */}
          {products.map((prdct, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
              key={index}
              className="product relative  min-w-[120px] min-h-[50px]  "
              onClick={() => handleSelectedProduct(index)}
            >
              <div className="prdct-detail flex justify-around items-center h-[42px] mt-[5px] bg-[#000000] rounded-[6px] shadow-xl">
                {/* prdct image */}
                <img
                  src={prdct.featuredImage}
                  alt="product-thumbnail"
                  className="z-20 h-7 w-7 object-cover"
                />
                {/* prdct detail */}
                <div className="prdct-detail flex flex-col justify-between">
                  <h4 className="text-[#DAAF37] text-xs mb-1 ">
                    {index + 5} left
                  </h4>
                  <h2 className="text-[#ECECEC] text-xs font-semibold font-avenir">
                    {prdct.title.length > 15
                      ? prdct?.title?.substring(0, 10)
                      : prdct?.title}
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
    </>
  );
};

export default SubCollectionCarousal;
