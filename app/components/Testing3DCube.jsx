// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-static-element-interactions */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable prettier/prettier */
import { defer } from '@shopify/remix-oxygen';
import { Await, Link } from '@remix-run/react';
import { Suspense, useRef, useState } from 'react';
import { Image, Money } from '@shopify/hydrogen';
import ProductGallery from '~/components/productGallery';
import Features from '~/components/Features';
import ProductDetail from '~/components/productDetail';
import { useSelector, useDispatch } from 'react-redux';
import { hanldeFeaturePage, toggleThemeMode } from '~/redux-toolkit/slices/index.slice';
import Carousal from '~/components/Carousal'
/**
 * @type {MetaFunction}
 */
export const meta = () => {
    return [{ title: 'Hydrogen | Home' }];
};

/**
 * @param {LoaderFunctionArgs}
 */

export async function loader({ context }) {
    const { storefront } = context;

}


export default function Homepage() {
    /** @type {LoaderReturnData} */
    const isDarkMode = useSelector((state) => state?.themeMode?.isDarkMode);
    const IsFeaturePageOpened = useSelector((state) => state?.themeMode?.IsFeaturePageOpened);
    const dispatch = useDispatch();


    const images = [
        {
            name: "watcht",
            category: 'men',
            variants: ["/splash/watch1.png", "/splash/watch2.png", "/splash/watch3.png", "/splash/watch4.png", "/splash/watch5.png"]
        },
        {
            name: "bracelet",
            category: 'women',
            variants: ["/splash/bracelet1.png", "/splash/bracelet2.png", "/splash/bracelet3.png"]
        },
        {
            name: "shart",
            category: 'men',
            variants: ["/splash/shart1.png", "/splash/shart2.png", "/splash/shart3.png"]
        },
        {
            name: "digital watch",
            category: 'men',
            variants: ["/splash/digital-watch1.png", "/splash/digital-watch2.png", "/splash/digital-watch3.png", "/splash/digital-watch4.png"]
        },
    ];

    const categories = ["all", "men", "women", "kids"]
    const [IsfeaturesMode, setIsfeaturesMode] = useState(false);
    const [Images, setImages] = useState(images);

    const [currentProductIdx, setCurrentProductIdx] = useState(0); // Track the current product index
    const [currentVariantIdx, setCurrentVariantIdx] = useState(0); // Track the current variant index
    const [transitionDirection, setTransitionDirection] = useState(''); // For X-axis transitions
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionDirectionY, setTransitionDirectionY] = useState(null);

    const [IsGallery, setGallery] = useState(false);
    const [category, setCategory] = useState("all");
    const [IsShowProductDesc, setShowProductDesc] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // changing light and dark mode func def
    const ThemeMode = () => {
        dispatch(toggleThemeMode())
    }

    // -------- handle features screen ----
    const handleIsFeatures = () => {

        // setIsfeaturesMode((prev) => !prev);
        dispatch(hanldeFeaturePage())
    }

    const handleGalleryScreen = () => {
        setGallery((prev) => !prev)
    }

    const showProductDescription = () => {
        setShowProductDesc((prev) => !prev)
    }
    // ----------- below is the logic for spinning tools to shuffle X & Y axis images
    const swipeThreshold = 50; // Threshold for swipe distance
    const startXRef = useRef(0);
    const startYRef = useRef(0);
    const isSwipingRef = useRef(false);

    // Handle X-axis swipe (left/right)
    const handleSwipeX = (direction) => {
        setIsTransitioning(true);
        setTransitionDirection(direction);

        setTimeout(() => {
            if (direction === 'left') {
                setCurrentProductIdx((prev) => (prev + 1) % Images.length);
            } else if (direction === 'right') {
                setCurrentProductIdx((prev) => (prev - 1 + Images.length) % Images.length);
            }
            // Reset variant index to the first variant when the product changes
            setCurrentVariantIdx(0);

            setIsTransitioning(false);
        }, 300); // Duration of the animation (should match the transition duration in Tailwind)
    };


    // Handle Y-axis swipe (up/down)
    const handleSwipeY = (direction) => {
        setIsTransitioning(true);
        setTransitionDirectionY(direction);

        setTimeout(() => {
            const variants = Images[currentProductIdx]?.variants || [];
            if (variants.length === 0) return;

            if (direction === 'up') {
                setCurrentVariantIdx((prev) => (prev + 1) % variants.length);
            } else if (direction === 'down') {
                setCurrentVariantIdx((prev) => (prev - 1 + variants.length) % variants.length);
            }
            setIsTransitioning(false);
        }, 300); // Ensure the duration matches the CSS transition duration
    };

    // Unified swipe handler based on direction
    const handleSwipe = (direction) => {
        if (direction === 'left' || direction === 'right') {
            handleSwipeX(direction);
            setTransitionDirectionY(null);
        } else if (direction === 'up' || direction === 'down') {
            handleSwipeY(direction);
            setTransitionDirection(null);
        }

        isSwipingRef.current = true;
    };


    const handleTouchStart = (event) => {
        startXRef.current = event.touches[0].pageX;
        startYRef.current = event.touches[0].pageY;
        isSwipingRef.current = false;
    };

    const handleTouchMove = (event) => {
        if (isSwipingRef.current) return;

        const diffX = event.touches[0].pageX - startXRef.current;
        const diffY = event.touches[0].pageY - startYRef.current;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > swipeThreshold) {
                if (diffX > 0) handleSwipe('right');
                else handleSwipe('left');
            }
        } else {
            if (Math.abs(diffY) > swipeThreshold) {
                if (diffY > 0) handleSwipe('down');
                else handleSwipe('up');
            }
        }
    };

    const handleTouchEnd = () => {
        isSwipingRef.current = false;
    };

    const handleCategory = (categoryName) => {
        setCategory(categoryName);

        if (categoryName === 'all') {
            setImages(images);
        } else {
            const filteredImages = images.filter((product) => product.category === categoryName);
            setImages(filteredImages);
        }

        setCurrentProductIdx(0);
        setCurrentVariantIdx(0);
    }


    //-------------- handle search query for product filtering --------
    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filteredImages = images.filter((product) =>
            product.name.toLowerCase().includes(query)
        );

        setImages(filteredImages);
        setCurrentProductIdx(0);
        setCurrentVariantIdx(0);
    }

    // --- select one of the carousel product -----
    const handleCarouselProduct = (product) => {
        setCurrentProductIdx(product);
        setGallery((prev) => !prev)
    }

    return (
        <>

            <div className="w-full h-full absolute ">
                <div className="w-full h-[30%] cursor-pointer mt-[3rem] bg-[#FEFCEB]">
                    <div className="w-full h-full flex flex-col items-center">

                        {/* </Link> */}
                        <div className="w-[90%] h-[75%] cursor-pointer ">
                            <div className="w-full h-full relative ">
                                <h1
                                    className='text-[#DAAF37] font-avenir'
                                    style={{
                                        fontSize: '28px',
                                        fontWeight: '700',
                                        lineHeight: '34px',
                                        letterSpacing: '0em',
                                        textAlign: 'left',
                                    }}
                                >
                                    Kelly&apos;s Kapsule
                                </h1>
                                {/* ------------- Carousal section ----------- */}
                                <Carousal handleCarouselProduct={handleCarouselProduct} />

                                {/* ------------- Carousal section END ----------- */}


                                <div className="w-full h-[25%] mt-[12px]  relative ">
                                    <div className="relative w-[85%] h-full border border-gray-500 rounded-md">
                                        <input
                                            type="text"
                                            className="w-full h-full grow pl-10 pr-3 py-2 border rounded-lg outline-0"
                                            style={{ border: '0px' }}
                                            placeholder="Search"
                                            value={searchQuery} // Bind the input value to the searchQuery state
                                            onChange={handleSearchChange} // Call the handler on change
                                        />

                                        <svg
                                            className="absolute inset-y-0 left-0 ml-3 mt-3 w-6 h-6 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="w-[15%] h-full  absolute right-0 top-0 ">
                                        <div className="w-full h-full flex flex-row  items-center justify-end ">
                                            <img
                                                src="/splash/king.png"
                                                alt="king"
                                                className="w-[40%] h-[40%]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full h-[20%]  flex flex-row justify-around absolute mt-[15px]">
                                    {categories.map((cate) => (
                                        <button
                                            key={cate}
                                            className={`min-w-[20%] max-w-auto h-full p-2 flex flex-row justify-center items-center rounded-lg ${category === cate
                                                ? 'bg-black text-white'
                                                : 'bg-[#ECECEC] text-black'
                                                }`}
                                            onClick={() => handleCategory(cate)}
                                        >
                                            {cate.charAt(0).toUpperCase() + cate.slice(1)}
                                        </button>
                                    ))}

                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                {/* --- below is the code that i need to implement the toggle functionality by chaning bg-dark and gray accordingly. */}
                <div className={`w-full h-[63%]  ${isDarkMode ? 'bg-[#000000]' : 'bg-backgroundColortool'} `}>
                    <div className="w-full h-[10%] flex flex-row ">
                        <div className="w-[75%] h-full flex flex-row p-2 gap-3 ">
                            <img src="/splash/rect1.png" alt="rect1" className="ml-3" onClick={handleGalleryScreen} />
                            <img src="/splash/rect2.png" alt="rect1" onClick={showProductDescription} />
                            <img src="/splash/rect3.png" alt="rect1" onClick={handleIsFeatures} />
                        </div>

                        {/* ---------- dark/light mode container -------- */}
                        <div className="w-[20%] mt-2 h-[2.3rem] flex flex-row justify-between rounded-full items-center border border-gray-300 px-1 py-2">
                            {/* light mode button */}
                            <div className=" w-full flex justify-start items-center">
                                <div className={`light-mode-btn justify-center items-center w-[2rem] h-[2rem] rounded-full bg-white ${isDarkMode ? 'hidden' : "flex"}`} style={{ borderRadius: "100%" }} onClick={ThemeMode}>
                                    <img src="/splash/light-mode.png" alt="light-mode" className='w-[1.5rem] ' />
                                </div>
                            </div>

                            {/* dark mode mode button */}
                            <div className="wrapper w-full flex justify-end items-center">
                                <div className={`light-mode-btn  justify-center items-center w-[2rem] h-[2rem] rounded-full bg-gray-500 ${!isDarkMode ? 'hidden' : "flex"}`} style={{ borderRadius: "100%" }} onClick={ThemeMode}>
                                    <img src="/splash/dark-mode.png" alt="light-mode" className='w-[1.5rem] ' />
                                </div>
                            </div>

                        </div>

                    </div>


                    <div className="w-full h-full flex flex-col justify-center items-center relative ">
                        <div className="w-full h-[90%] flex justify-center items-center">

                            <div className="w-full h-[60%] flex justify-center items-center">


                                {/* ----- below section shoube 3d cube type format*/}
                                <div className="relative w-[70%] h-full flex justify-center items-center perspective-1000" style={{ perspective: "1000px" }}>
                                    <div
                                        className={`cube relative w-full h-full transform-style-preserve-3d transition-transform duration-500`}
                                        style={{
                                            transform: `rotateX(${currentVariantIdx * -90}deg) 
                        rotateY(${currentProductIdx * 90}deg)`,
                                            transformStyle: "preserve-3d",
                                            transition: "transform 1s ease-in-out",
                                            backfaceVisibility: "hidden"
                                        }}
                                        onTouchStart={handleTouchStart}
                                        onTouchMove={handleTouchMove}
                                        onTouchEnd={handleTouchEnd}
                                    >
                                        {/* Front Face */}
                                        <div
                                            className="cube-face front absolute w-full h-full flex items-center justify-center bg-white shadow-xl transition-transform duration-300 z-50 "
                                            style={{ transform: "rotateY(0deg) translateZ(100px)", backfaceVisibility: "hidden" }}
                                        >
                                            <img
                                                src={Images[currentProductIdx]?.variants[0]}
                                                alt="front"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Right Face */}
                                        <div
                                            className="cube-face right absolute w-full h-full flex items-center justify-center bg-white shadow-xl"
                                            style={{ transform: "rotateY(90deg) translateZ(100px)", backfaceVisibility: "hidden" }}
                                        >
                                            <img
                                                src={Images[(currentProductIdx + 1) % Images.length]?.variants[0]}
                                                alt="right"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Back Face */}
                                        <div
                                            className="cube-face back absolute w-full h-full flex items-center justify-center bg-white shadow-xl"
                                            style={{ transform: "rotateY(180deg) translateZ(100px)", backfaceVisibility: "hidden" }}
                                        >
                                            <img
                                                src={Images[(currentProductIdx + 2) % Images.length]?.variants[0]}
                                                alt="back"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Left Face */}
                                        <div
                                            className="cube-face left absolute w-full h-full flex items-center justify-center bg-white shadow-xl"
                                            style={{ transform: "rotateY(-90deg) translateZ(100px)", backfaceVisibility: "hidden" }}
                                        >
                                            <img
                                                src={Images[(currentProductIdx - 1 + Images.length) % Images.length]?.variants[0]}
                                                alt="left"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Top Face */}
                                        <div
                                            className="cube-face top absolute w-full h-full flex items-center justify-center bg-white shadow-xl"
                                            style={{ transform: "rotateX(90deg) translateZ(100px)", backfaceVisibility: "hidden" }}
                                        >
                                            <img
                                                src={Images[currentProductIdx]?.variants[(currentVariantIdx + 1) % Images[currentProductIdx]?.variants.length]}
                                                alt="top"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Bottom Face */}
                                        <div
                                            className="cube-face bottom absolute w-full h-full flex items-center justify-center bg-white shadow-xl"
                                            style={{ transform: "rotateX(-90deg) translateZ(100px)", backfaceVisibility: "hidden" }}
                                        >
                                            <img
                                                src={Images[currentProductIdx]?.variants[(currentVariantIdx - 1 + Images[currentProductIdx]?.variants.length) % Images[currentProductIdx]?.variants.length]}
                                                alt="bottom"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>




                            </div>
                        </div>
                    </div>
                </div>
                {/* --- Ending the toggle functionality by chaning bg-dark and gray accordingly. */}

                {/* showing product gallery */}
                {IsGallery && <ProductGallery isDarkMode={isDarkMode} setgallery={setGallery} galleryImages={Images[currentProductIdx]?.variants} />}
                {/* showing features actions */}
                {IsFeaturePageOpened && <Features isDarkMode={isDarkMode} productImg={Images[currentProductIdx]?.variants[currentVariantIdx]} />}
            </div>

        </>
    );
}





