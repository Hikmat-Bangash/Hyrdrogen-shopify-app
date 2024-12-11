/* eslint-disable prettier/prettier */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef } from 'react';
import SharePlatforms from './SharePlatforms';
import { FaWindowClose } from 'react-icons/fa';
import { Link, useNavigate} from '@remix-run/react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IoShareSocialOutline } from 'react-icons/io5';
import { GoBookmark } from 'react-icons/go';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites } from '~/redux-toolkit/slices/favourite_slice';
import { toast } from 'react-toastify';
import { ImSpinner10 } from "react-icons/im";

const Features = ({
  isDarkMode,
  setIsfeaturesMode,
  category,
  setCategory,
  product,
  variant
}) => {
  const [isShare, setisShare] = useState(false);
  const favoritesList = useSelector((state) => state?.favourites?.items);
  const [swipeStyle, setSwipeStyle] = useState({ transform: 'translate(0, 0)' });
  const navigate = useNavigate();
  const [currentVariant, setcurrentVariant] = useState(product?.variants[variant]);
  const [variantIndex, setVariantIndex] = useState(variant);
  const isProductExist = favoritesList?.some((favorite) => (favorite.id === product.id || favorite.id === currentVariant?.id ));
  const [Loader, setLoader] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);



  const dispatch = useDispatch();

  const handleShareProduct = () => {
    setisShare((prev) => !prev);
  };

  const handleClosing = () => {
    setIsfeaturesMode((prev) => !prev);
    setCategory(category);
  };

  const handleAddToFavorites = () => {
    const Variant = currentVariant;
    const variantInfo = {
      product,
      id: Variant?.id,
      amount: Variant?.price?.amount,
      variantTitle: Variant?.title,
      handle: product?.handle,
      productType: product?.title,
      image: Variant?.image?.url,
      variantIndex
    }
    
    dispatch(addToFavorites(variantInfo));
  };

  const handleShoppingCart = () => {
    toast.error('This feature is in progress');
  };

  const handleRedirectionToCart = () => {
    setLoader(true);
    console.log("redirection to cart");
    navigate(`/products/${product?.handle}`)
}

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;

    const deltaX = currentX - touchStartX.current;
    const deltaY = currentY - touchStartY.current;

    setSwipeStyle({ transform: `translate(${deltaX}px, ${deltaY}px)` });
  };

  const handleVariantClick = (variant, index) => {
    setcurrentVariant(variant);
    setVariantIndex(index);
  }

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    // Determine swipe direction and threshold
    const threshold = 50;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
      // Horizontal Swipe
      if (deltaX > 0) {
        handleRedirectionToCart();
      } else {
        handleShoppingCart(); // Swiped Right
      }
    } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > threshold) {
      // Vertical Swipe
      if (deltaY > 0) {
        handleShareProduct(); // Swiped Down
      } else {
        handleAddToFavorites();
      }
    }
    // Reset swipe style
    setSwipeStyle({ transform: 'translate(0, 0)' });
  };

  return (
    <>
      <div className="featureContainer w-screen h-screen flex justify-center items-center fixed top-0 backdrop-blur-xl z-20 flex-col gap-2">
        <div
          className={`w-full -mt-12 h-[58%] relative ${isDarkMode ? 'bg-[#000000]' : 'bg-backgroundColortool'
            }`}
        >
          <div className="w-full h-full flex flex-col justify-center items-center relative">
            <div className="w-full h-full">
              <div className="w-full h-full relative flex flex-col">
                <div className="w-full h-[8%] absolute top-1 flex flex-row justify-center">
                  <div
                    className={`w-full  text-[2rem] h-full flex flex-row justify-center items-center ${isProductExist ? 'text-red-500 font-bold' : "text-white"}`}
                    style={{
                      backgroundImage: isDarkMode
                        ? "url('/splash/dark-top-frame.png')"
                        : "url('/splash/bottom1.png')",
                      backgroundSize: '100% 100%',
                    }}
                    id="top"
                    onClick={handleAddToFavorites}
                  >
                    <GoBookmark />
                  </div>
                </div>

                <div className="w-full h-[70%] flex flex-row">
                  <div
                    className="w-[9%] h-full text-white text-[2rem] absolute top-0 left-0 flex flex-row justify-center items-center"
                    style={{
                      backgroundImage: isDarkMode
                        ? "url('/splash/dark-right-frame.png')"
                        : "url('/splash/right1.png')",
                      backgroundSize: '100% 100%',
                    }}
                    id="left"
                    onClick={handleShoppingCart}
                  >
                    <HiOutlineShoppingBag />
                  </div>

                  <div
                    className="ml-[10%] w-[80%] absolute top-0 p-1 object-cover h-[83%] mt-[10.5%] flex justify-center items-center"
                    id="center"
                  >
                    <div
                      className="w-full h-full object-cover flex justify-center items-center"
                      style={swipeStyle}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      <img
                        src={currentVariant?.image?.url}
                        alt="centerImg"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <Link to={`/products/${product?.handle}`}>
                    <div
                      className="w-[9%] h-full text-white text-[2rem] absolute top-0 right-0 flex flex-row justify-center items-center"
                      style={{
                        backgroundImage: isDarkMode
                          ? "url('/splash/left-dark-frame.png')"
                          : "url('/splash/left1.png')",
                        backgroundSize: '100% 100%',
                      }}
                      id="right"
                    >
                      {Loader ? (
                        <div className="loader animate-spin text-white font-bold text-2xl ">
                          <ImSpinner10 />
                      </div>
                      ) : (
                        <AiOutlineShoppingCart />
                      )}
                     
                    </div>
                  </Link>
                </div>

                <div
                  className="w-full h-[8%] absolute bottom-1 flex flex-row justify-center"
                  onClick={handleShareProduct}
                >
                  <div
                    className="w-full h-full text-white text-[2rem] flex flex-row justify-center items-center"
                    style={{
                      backgroundImage: isDarkMode
                        ? "url('/splash/dark-bottom-frame.png')"
                        : "url('/splash/top1.png')",
                      backgroundSize: '100% 100%',
                    }}
                    id="bottom"
                  >
                    <IoShareSocialOutline />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* close button */}
          <button
            className="absolute -top-11 right-0 text-5xl text-buttonlogin font-bold"
            onClick={handleClosing}
          >
            <FaWindowClose />
          </button>
        </div>

        {/*--------- other variants images ------- */}
        <div className="other-variants flex flex-wrap gap-3 mt-3">
          {product?.variants?.map((variant, index) => (
            <div className={`w-20 h-20 border-2 object-cover rounded-xl overflow-hidden ${currentVariant?.id == variant.id ? 'border-yellow-500': "bg-gray-100"}`} key={variant.id} onClick={()=>handleVariantClick(variant, index)}>
              <img src={variant?.image?.url} alt="variantImg" className='object-cover w-20 h-20' />
            </div>
          ))}
        </div>
      </div>


      {isShare && <SharePlatforms setisShare={setisShare} />}
    </>
  );
};

export default Features;
