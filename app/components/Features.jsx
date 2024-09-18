import React, {useState} from 'react';
import SharePlatforms from './SharePlatforms';

const Features = ({isDarkMode, productImg}) => {
  const [isShare, setisShare] = useState(false);

  const handleShareProduct = () => {
    setisShare((prev) => !prev);
  };
  return (
    <>
      <div
        className={`w-full  h-[68%] fixed bottom-[4.3rem] ${
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
                  className=" ml-[15%] w-[70%] p-1 object-cover h-[100%] mt-[5.5rem] flex justify-center items-center  "
                  id="center"
                >
                  <div className=" w-full h-full object-cover flex justify-center items-center">
                    <img
                      src={productImg}
                      alt="centerImg"
                      className="w-full h-full object-cover"
                    />
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
                    src="/splash/cartIcon.png"
                    alt="rightImg"
                    className="w-[40px] h-[40px] cursor-pointer"
                    loading="lazy"
                  />
                </div>
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
      </div>

      {isShare && <SharePlatforms setisShare={setisShare} />}
    </>
  );
};

export default Features;
