import React from 'react';

const ProductDetail = ({
  isDarkMode,
  product,
  isMobileWidth,
  IsDisplaySubCarousel,
}) => {
  console.log('product detail: ', product);
  return (
    <div
      className={`contianer  fixed z-40 ${
        isMobileWidth
          ? 'w-[77%] h-[59%] left-[3rem]  top-[20%] '
          : 'w-[70%] h-[60%] left-[3.1rem]  top-[20%] '
      }  backdrop-blur-sm  justify-center items-center ${
        isDarkMode ? 'bg-black/60' : 'bg-[#FFFFFFBF]'
      } rounded-md `}
    >
      <div className="wrapper overflow-hidden relative w-full h-full flex flex-col gap-[1rem]  rounded-[0.93rem] p-3  overflow-y-scroll">
        {/* heading and sub-heading */}
        <div className="heading-sub-heading  flex flex-col gap-2">
          <p
            className={`font-bold text-[10px] leading-[14px] ${
              isDarkMode ? 'text-[#D9D9D9]' : 'text-black'
            } `}
          >
            Low stock - 10 items left
          </p>

          <p
            className={`font-bold font-avenir text-[16px] leading-[24px] tracking-[0.5px] ${
              isDarkMode ? 'text-[#D9D9D9]' : 'text-black'
            }`}
          >
            {product?.title}
          </p>

          <p className="font-bold text-[16px] leading-[24px] text-[#DAAF37]">
            ${product?.priceRange?.amount}
          </p>
        </div>

        {/* --- description ------- */}
        <p
          className={`text-[12px] leading-[18px] ${
            isDarkMode ? 'text-white' : 'text-black'
          } `}
        >
          {product?.description}
        </p>
        {/* icons + names */}
        <div className="icons-names w-full flex justify-between">
          {/* icon1 */}
          <div className="icon1 flex flex-col gap-2 justify-center items-center">
            <img src="/splash/icon1.png" alt="icon1" className="" />
            <p
              className={`text-[10px] leading-[14px]  ${
                isDarkMode ? 'text-white' : 'text-black'
              } `}
            >
              Water Resistant
            </p>
          </div>
          {/* icon2 */}
          <div className="icon1 flex flex-col gap-2 justify-center items-center">
            <img src="/splash/icon2.png" alt="icon1" className="" />
            <p
              className={`text-[10px] leading-[14px]  ${
                isDarkMode ? 'text-white' : 'text-black'
              } `}
            >
              Crystal Glass
            </p>
          </div>
          {/* icon3 */}
          <div className="icon1 flex flex-col gap-2 justify-center items-center">
            <img src="/splash/icon3.png" alt="icon1" className="" />
            <p
              className={`text-[10px] leading-[14px]  ${
                isDarkMode ? 'text-white' : 'text-black'
              } `}
            >
              124 Gram
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
