/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {useState} from 'react';
// import {MdOutlineArrowBack} from 'react-icons/md';
const ProductGallery = ({setgallery}) => {
  const images = [
    // '/splash/watch1.png',
    '/splash/watch2.png',
    '/splash/watch3.png',
    '/splash/watch4.png',
    '/splash/watch5.png',
  ];

  const [activeImg, setactiveImg] = useState(0);

  const handleGalleryBackAction = () => {
    setgallery((prev) => !prev);
  };

  const handleActiveImg = (imgNo) => {
    setactiveImg(imgNo);
  };

  return (
    <div className="contianer w-full h-screen absolute z-40 top-0 bg-black/70 backdrop-blur-sm flex justify-center items-center">
      <div className="wrapper overflow-hidden relative w-full h-[32rem] flex flex-col gap-[1rem]  rounded-[0.93rem] px-1">
        {/* product screen */}
        <div
          className="screen w-full h-[420px] bg-gradient-to-r from-gray-800 via-black-100 to-gray-800 bg-opacity-30 rounded-[0.93rem] flex flex-col gap-2 "
          style={{boxShadow: '4px 2px 5px 4px rgba(255, 255, 255, 0.2)'}}
        >
          {/* upper back-btn bg */}
          <div
            className="back-btn-bg ml-4 py-2 w-full shadow-md h-16 flex items-center text-[#B3B3B3] font-bold text-[1rem] tracking-normal cursor-pointer"
            onClick={handleGalleryBackAction}
          >
            <img
              src="/splash/gallery-back-btn.png"
              alt="back-btn"
              className="mr-2"
            />
            Back
          </div>
          {/* product showing section */}
          <div className="product-showing-section flex justify-center items-center w-full h-[20rem]  p-3">
            <img src={images[activeImg]} alt="mainImg" />
          </div>
        </div>

        {/* product images */}
        <div className="product-imgs w-full flex gap-2 ">
          {/* product1 */}
          {images.map((img, index) => (
            <div
              key={index}
              className={`product1 w-[85px] h-[85px] bg-gradient-to-b from-black to-black/50 rounded-md object-cover p-1 flex justify-center items-center ${
                index === activeImg && 'border-2 border-[#DAAF37]'
              }`}
              onClick={() => handleActiveImg(index)}
            >
              <img src={images[index]} alt="productImg" />
            </div>
          ))}
          {/* <div className="product1 w-[85px] h-[85px] bg-gradient-to-b from-black to-black/50 rounded-md border-2 border-[#DAAF37]"></div>
          <div className="product1 w-[85px] h-[85px] bg-gradient-to-b from-black to-black/50 rounded-md"></div>
          <div className="product1 w-[85px] h-[85px] bg-gradient-to-b from-black to-black/50 rounded-md"></div>
          <div className="product1 w-[85px] h-[85px] bg-gradient-to-b from-black to-black/50 rounded-md"></div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
