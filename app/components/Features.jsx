/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {useState} from 'react';
import SharePlatforms from './SharePlatforms';
import {FaWindowClose} from 'react-icons/fa';
import {Link} from '@remix-run/react';

const Features = ({isDarkMode, setIsfeaturesMode, productImg, product}) => {
  const [isShare, setisShare] = useState(false);

  const handleShareProduct = () => {
    setisShare((prev) => !prev);
  };

  const handleClosing = () => {
    setIsfeaturesMode((prev) => !prev);
  };

  return (
    <>
      <div className="featureContainer w-screen h-screen flex justify-center items-center fixed top-0 backdrop-blur-xl z-20">
        <div
          className={`w-full  h-[68%] relative   ${
            isDarkMode ? 'bg-[#000000]' : 'bg-backgroundColortool'
          }
        } `}
        >
          <div className="w-full h-full flex flex-col justify-center items-center relative ">
            <div className="w-full h-full">
              <div className="w-full h-full relative flex flex-col ">
                <div className="w-full h-[15%] absolute top-0 flex flex-row justify-center ">
                  <div
                    className="w-full h-full flex flex-row justify-center items-center  "
                    style={{
                      backgroundImage: isDarkMode
                        ? "url('/splash/dark-top-frame.png')"
                        : "url('/splash/bottom1.png')",
                      backgroundSize: '100% 100%',
                    }}
                    id="top"
                  >
                    <img
                      src="/splash/favouriteIcon.png"
                      alt="topImg"
                      className="w-[30px] h-[34px] cursor-pointer"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="w-full h-[70%]  flex flex-row">
                  <div
                    className="w-[15%] h-full absolute top-0 left-0  flex flex-row justify-center items-center"
                    style={{
                      backgroundImage: isDarkMode
                        ? "url('/splash/dark-right-frame.png')"
                        : "url('/splash/right1.png')",

                      backgroundSize: '100% 100%',
                    }}
                    id="left"
                  >
                    <img
                      src="/splash/storeIcon.png"
                      alt="leftImg"
                      className="w-[30px] h-[34px] cursor-pointer border-2"
                      loading="lazy"
                    />
                  </div>

                  <div
                    className=" ml-[15%] w-[70%] p-1 object-cover h-full mt-[22%] flex justify-center items-center  "
                    id="center"
                  >
                    <div className=" w-full h-full object-cover flex justify-center items-center">
                      <img
                        src={product?.featuredImage}
                        alt="centerImg"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <Link to={`/products/${product?.handle}`}>
                    <div
                      className="w-[15%] h-full absolute top-0  right-0 flex flex-row justify-center items-center"
                      style={{
                        backgroundImage: isDarkMode
                          ? "url('/splash/left-dark-frame.png')"
                          : "url('/splash/left1.png')",
                        backgroundSize: '100% 100%',
                      }}
                      id="right"
                    >
                      <img
                        src="/splash/cartIcon.png"
                        alt="rightImg"
                        className="w-[40px] h-[40px] cursor-pointer"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                </div>

                <div
                  className="w-full h-[14%] absolute bottom-0  flex flex-row justify-center"
                  onClick={handleShareProduct}
                >
                  <div
                    className="w-full h-full flex flex-row justify-center items-center "
                    style={{
                      backgroundImage: isDarkMode
                        ? "url('/splash/dark-bottom-frame.png')"
                        : "url('/splash/top1.png')",

                      backgroundSize: '100% 100%',
                    }}
                    id="bottom"
                  >
                    <img
                      src="/splash/shareIcon.png"
                      alt="splash1"
                      className="w-[40px] h-[40px] cursor-pointer"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* close button */}
          <button
            className="absolute -top-12 right-1 text-5xl text-[#FEFCEB]  font-bold"
            onClick={handleClosing}
          >
            <FaWindowClose />
          </button>
        </div>
      </div>

      {isShare && <SharePlatforms setisShare={setisShare} />}
    </>
  );
};

export default Features;
