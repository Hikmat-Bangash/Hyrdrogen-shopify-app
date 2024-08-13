import React from 'react';

const ProductDetail = ({isDarkMode}) => {
  console.log('product detail component rendered');
  return (
    <div
      className={`contianer w-full h-full absolute z-40 top-0  backdrop-blur-sm   justify-center items-center ${
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
            className={`font-bold text-[16px] leading-[24px] tracking-[0.5px] ${
              isDarkMode ? 'text-[#D9D9D9]' : 'text-black'
            }`}
          >
            Digital Fitness Watch
          </p>

          <p className="font-bold text-[16px] leading-[24px] text-[#DAAF37]">
            $150
          </p>
        </div>

        {/* --- description ------- */}
        <p
          className={`text-[12px] leading-[18px] ${
            isDarkMode ? 'text-white' : 'text-black'
          } `}
        >
          From built-in GPS tracking to advanced heart rate monitoring, this
          fitness watch has everything you need to keep yourself motivated and
          in shape
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
