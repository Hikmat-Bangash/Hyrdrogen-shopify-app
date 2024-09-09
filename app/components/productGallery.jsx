// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable prettier/prettier */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {useState} from 'react';
// import {MdOutlineArrowBack} from 'react-icons/md';
const ProductGallery = ({ isDarkMode, setgallery, galleryImages }) => {

  const [activeImg, setactiveImg] = useState(0);

  const handleGalleryBackAction = () => {
    setgallery((prev) => !prev);
  };

  const handleActiveImg = (imgNo) => {
    setactiveImg(imgNo);
  };

  return (
    <div className="contianer w-full h-screen fixed z-40 top-0 bg-black/70 backdrop-blur-sm flex justify-center items-center">
      <div className=" overflow-hidden relative w-full h-[34rem] flex flex-col gap-[1rem]   rounded-[0.93rem] px-1">
        {/* product screen */}
        <div
          className={`screen w-full h-[420px] bg-gradient-to-b ${isDarkMode ? "from-gray-800 to-black-50" : " from-white-100 to-white-50"}  bg-opacity-30 rounded-[0.93rem] flex flex-col gap-2 `}
          style={{boxShadow: '4px 2px 5px 4px rgba(255, 255, 255, 0.2)'}}
        >
          {/* upper back-btn bg */}
          <div
            className={`back-btn-bg ml-4 py-2 w-full h-16 flex items-center  font-bold text-[1.1rem] tracking-normal cursor-pointer ${isDarkMode ? "text-[#B3B3B3]" : "text-gray-500"}`}
            onClick={handleGalleryBackAction}
          >
            <img
              src="/splash/gallery-back-btn.png"
              alt="back-btn"
              className="mr-2 "
            />
            Back
          </div>
          {/* product showing section */}
          <div className="product-showing-section flex justify-center items-center w-full h-[22rem]  p-2">
            <img src={galleryImages[activeImg]} alt="mainImg" className='object-cover w-full h-full' />
          </div>
        </div>

        {/* product images */}
        <div className="product-imgs w-full overflow-x-auto flex gap-2 ">
          {/* product1 */}
          {galleryImages.map((img, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={`product1 w-[85px] h-[85px] bg-gradient-to-b ${isDarkMode ? "from-black to-black/50" : "from-white-100 to-white-50"}  rounded-md object-cover p-1 flex justify-center items-center ${
                index === activeImg && 'border-2 border-[#DAAF37]'
              }`}
              onClick={() => handleActiveImg(index)}
            >
              <img src={galleryImages[index]} alt="productImg" className='object-cover w-[85px] h-[80px]' />
            </div>
          ))}
         
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
