import React, {useState} from 'react';

const StartedScreen = ({setIsStartedPage}) => {
  const [IsFirstPage, setIsFirstPage] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handlePageChange = () => {
    setIsFirstPage((prev) => !prev);
  };

  // moving to the Home page
  const handleHomePageChange = () => {
    setIsStartedPage((next) => !next);
  };

  return (
    <div className="w-screen h-screen overflow-hidden z-50 fixed top-0 bottom-0 bg-yellow-50">
      {IsFirstPage ? (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <img
          src="/splash/initialScreen/firstScreenPng.png"
          alt="firstScreen"
          className="w-full h-full"
          onClick={handlePageChange}
        />
      ) : (
        <div className="auth-section w-full h-full flex flex-col justify-between">
          <div className="topSection flex flex-col gap-20 relative">
            {/* picture */}
            {!isImageLoaded && (
              <div className="spinner h-[180px] flex justify-center items-center">
                <div className="w-14 h-14 border-4 border-[#DAAF37] border-dotted rounded-full animate-spin"></div>
              </div> // Placeholder or spinner while the image loads
            )}
            <img
              src="/splash/initialScreen/auth-img.png"
              alt="firstScreen"
              className={`transition-opacity duration-500 ease-in-out ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsImageLoaded(true)}
            />
            {/* description */}
            <p className="leading-[20px] text-[1rem] text-[#282828] p-3">
              Customize your designs, discover your unique style. This is your
              one-stop shop to create customized looks that are unique to you.
            </p>
            {/* ----- Spintura heading ---- */}
            <div className="spinture absolute bottom-[7.5rem] right-[5.7rem] shadow-xl font-source flex justify-center items-center w-[198px] h-[80px] bg-white rounded-[10px] text-[40px] font-bold leading-[48px] text-[#DAAF37]">
              Spintura
            </div>
          </div>

          {/* auth buttons */}
          <div className="btns flex flex-col gap-4 p-4 mb-5">
            <button
              className="w-full h-[50px] bg-[#DAAF37] text-black font-bold tracking-wide rounded-[4px] flex justify-center items-center cursor-pointer"
              onClick={handleHomePageChange}
            >
              Log In
            </button>
            {/* Sign Up button */}
            <button
              className="w-full h-[50px] border border-[#DAAF37] text-[#DAAF37] font-bold tracking-wide rounded-[4px] flex justify-center items-center cursor-pointer"
              onClick={handleHomePageChange}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartedScreen;
