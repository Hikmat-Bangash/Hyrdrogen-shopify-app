import React from 'react';

const Features = ({isDarkMode, productImg}) => {
  return (
    <>
      <div
        className={`w-full  h-[70%] absolute bottom-[4.3rem] ${
          isDarkMode ? 'bg-[#000000]' : 'bg-backgroundColortool'
        }
        } `}
      >
        <div className="w-full h-full flex flex-col justify-center items-center relative ">
          <div className="w-full h-full">
            <div className="w-full h-full relative flex flex-col ">
              <div className="w-full h-[13%] absolute top-0 flex flex-row justify-center ">
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
                    src="/splash/favourite-icon.png"
                    alt="topImg"
                    className="w-[30px] h-[34px] cursor-pointer"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="w-full h-[60%] flex flex-row">
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
                    src="/splash/store-icon.png"
                    alt="leftImg"
                    className="w-[30px] h-[34px] cursor-pointer"
                    loading="lazy"
                  />
                </div>

                <div
                  className=" ml-[15%] w-[70%] p-1 h-[23.3rem] mt-[4rem] flex justify-center items-center  "
                  id="center"
                >
                  <div className="wrapper w-full h-full flex justify-center items-center">
                    <img src={productImg} alt="centerImg" className="" />
                  </div>
                </div>

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
                    src="/splash/cart-icon.png"
                    alt="rightImg"
                    className="w-[40px] h-[40px] cursor-pointer"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="w-full h-[14%] absolute bottom-0  flex flex-row justify-center ">
                <div
                  className="w-full h-full flex flex-row justify-center items-center  "
                  style={{
                    backgroundImage: isDarkMode
                      ? "url('/splash/dark-bottom-frame.png')"
                      : "url('/splash/top1.png')",

                    backgroundSize: '100% 100%',
                  }}
                  id="bottom"
                >
                  <img
                    src="/splash/share_icon.png"
                    alt="splash1"
                    className="w-[40px] h-[40px] cursor-pointer"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
