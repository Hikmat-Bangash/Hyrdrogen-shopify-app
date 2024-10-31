// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-static-element-interactions */
// import React, {useEffect, useRef, useState} from 'react';

import React from 'react';

export const PRODUCTS = [
  {
    NAME: 'All',
    QUANTITY: '3',
    IMAGE:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROoi0YgjRR9l27Rg28dDSNV5LoMmd1FQCFhg&s',
  },
  {
    NAME: 'Men',
    QUANTITY: '3',
    IMAGE:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1H4adfVYc5x3jYel-Uzfurm0b8vcoocMpLA&s',
  },
  {
    NAME: 'Women',
    QUANTITY: '3',
    IMAGE:
      'https://www.azureofficial.pk/cdn/shop/collections/category-diva_1024x1024.jpg?v=1722405730',
  },
  {
    NAME: 'Kids',
    QUANTITY: '3',
    IMAGE:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf3p7-K41tsgqMu36VXJLbIvV_AanFa9aygg&s',
  },
];

const MainCarousal = ({collections, handleMainProductsCollection}) => {
  return (
    <>
      <div className="container flex w-full h-[50px] overflow-x-auto mt-2">
        <div className="carousal-wrapper flex gap-3">
          {/* Carousel of products */}
          {collections.map((collection, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
              key={index}
              className="product relative  min-w-[120px] min-h-[50px]  "
              onClick={() => handleMainProductsCollection(collection?.id)}
            >
              <div className="prdct-detail flex justify-around items-center h-[42px] mt-[5px] bg-[#000000] rounded-[6px] shadow-xl">
                {/* prdct image */}
                <img
                  src={collection?.image}
                  alt="product-thumbnail"
                  className="z-20 h-9 w-8 object-cover"
                />
                {/* prdct detail */}
                <div className="prdct-detail flex flex-col justify-between">
                  {/* <h4 className="text-[#DAAF37] text-xs mb-1 ">
                    {prdct.QUANTITY} left
                  </h4> */}
                  <h2 className="text-[#ECECEC] text-xs font-semibold font-avenir">
                    {collection?.title}
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

export default MainCarousal;
