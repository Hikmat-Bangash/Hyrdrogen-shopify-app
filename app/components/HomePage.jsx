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
import { Suspense, useEffect, useRef, useState } from 'react';
import { Image, Money } from '@shopify/hydrogen';
import ProductGallery from '~/components/productGallery';
import Features from '~/components/Features';
import ProductDetail from '~/components/productDetail';
import { useSelector, useDispatch } from 'react-redux';
import { hanldeFeaturePage, toggleThemeMode } from '~/redux-toolkit/slices/index.slice';
import Carousal from '~/components/Carousal'
import Main_Carousel from '~/components/main_carousel'
import SubCollectionCarousal from '~/components/subCollection'
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
/**
 * @type {MetaFunction}
 */
export const meta = () => {
    return [{ title: 'Hydrogen | Home' }];
};

const PANEL_COUNT = 5; // Fixed number of panels for the prism layout

// Function to create a non-random duplication of products, ensuring no duplicates appear consecutively
const createNonDuplicateOrder = (items) => {
    const result = [...items];
    const totalItems = items.length;

    // If there are fewer than 5 products, duplicate them but maintain the same sequence
    if (totalItems < PANEL_COUNT) {
        let i = 0;
        while (result.length < PANEL_COUNT) {
            result.push(items[i % totalItems]);
            i++;
        }
    }

    // Return a fixed array with at least 5 items
    return result;
};

// Function to duplicate images for vertical carousel if less than 5 images in a product
const duplicateVerticalPanels = (images) => {
    const duplicatedImages = [...images];
    const totalImages = images.length;

    // If fewer than 5 images, duplicate them in a fixed sequence
    if (totalImages < PANEL_COUNT) {
        let i = 0;
        while (duplicatedImages.length < PANEL_COUNT) {
            duplicatedImages.push(images[i % totalImages]);
            i++;
        }
    }

    return duplicatedImages;
};

// =============== SPINSWIPE FUNCTIONALITY END ============



export default function HomepageCopy({ productsList }) {
    const isDarkMode = useSelector((state) => state?.themeMode?.isDarkMode);
    const dispatch = useDispatch();


    const categories = ["All", "Men", "Women", "Kids"]
    const [IsfeaturesMode, setIsfeaturesMode] = useState(false);
    // const [Images, setImages] = useState(images);
    const [products, setproducts] = useState(productsList);

    const [currentProductIdx, setCurrentProductIdx] = useState(0); // Track the current product index

    const [IsGallery, setGallery] = useState(false);
    const [category, setCategory] = useState("All");
    const [IsShowProductDesc, setShowProductDesc] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [horizontalIndex, setHorizontalIndex] = useState(0); // For X-axis carousel
    const [verticalIndex, setVerticalIndex] = useState(0); // For Y-axis carousel
    const [activeCarousel, setActiveCarousel] = useState("horizontal"); // Track active carousel
    const [isMobileWidth, setIsMobileWidth] = useState(true);
    const [isSearchTrue, setIsSearchTrue] = useState(false);
    const [isSubCategory, setisSubCategory] = useState(true);


    // changing light and dark mode func def
    const ThemeMode = () => {
        dispatch(toggleThemeMode())
    }

    // -------- handle features screen ----
    const handleIsFeatures = () => {
        console.log("is features screen")
        setIsfeaturesMode((prev) => !prev);
        dispatch(hanldeFeaturePage())
    }

    const handleGalleryScreen = () => {
        setGallery((prev) => !prev)
    }

    const showProductDescription = () => {
        setShowProductDesc((prev) => !prev)
    }

    const rotationPerPanel = 360 / PANEL_COUNT; // Rotation angle for each panel

    // Separate touch tracking states for horizontal and vertical carousels
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchStartY, setTouchStartY] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);
    const [touchEndY, setTouchEndY] = useState(0);

    // Separate handlers for touch events in horizontal and vertical carousels
    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
        setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
        setTouchEndX(e.touches[0].clientX);
        setTouchEndY(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
        const horizontalSwipe = Math.abs(touchStartX - touchEndX) > 50;
        const verticalSwipe = Math.abs(touchStartY - touchEndY) > 50;

        // Handle horizontal swipes (left and right) for horizontal carousel
        if (horizontalSwipe && !verticalSwipe) {
            setActiveCarousel("horizontal"); // Set horizontal carousel as active
            if (touchStartX - touchEndX > 50) {
                // Swipe left (next panel)
                setHorizontalIndex((prevIndex) => (prevIndex + 1));
                setVerticalIndex(0); // Reset vertical index
                setTimeout(() => {
                    setVerticalIndex(1); // Reset vertical index
                }, 1000);
            } else if (touchEndX - touchStartX > 50) {
                // Swipe right (previous panel)
                setHorizontalIndex((prevIndex) => (prevIndex - 1));
                setVerticalIndex(0); // Reset vertical index
                setTimeout(() => {
                    setVerticalIndex(1); // Reset vertical index
                }, 1000);
            }
        }

        // Handle vertical swipes (up and down) for vertical carousel
        if (verticalSwipe && !horizontalSwipe) {
            setActiveCarousel("vertical"); // Set vertical carousel as active
            const productImages = products[horizontalIndex % products.length]?.images || [];
            const duplicatedImages = duplicateVerticalPanels(productImages);
            if (touchStartY - touchEndY > 50) {
                // Swipe up (next panel)
                setVerticalIndex((prevIndex) => (prevIndex + 1) % duplicatedImages.length);
            } else if (touchEndY - touchStartY > 50) {
                // Swipe down (previous panel)
                setVerticalIndex((prevIndex) =>
                    prevIndex === 0 ? duplicatedImages.length - 1 : prevIndex - 1
                );
            }
        }
    };

    // Get the duplicated panels for both carousels
    const currentProduct = products[horizontalIndex % products.length] || {};
    const currentProductImages = duplicateVerticalPanels(currentProduct.images || []);
    const duplicatedProducts = createNonDuplicateOrder(products);


    // ============ end of the spinning tool ---------------

    const [noProductsFound, setNoProductsFound] = useState(false); // State to track if products are found or not

    const handleCategory = (categoryName) => {
        // Set the selected category
        setCategory(categoryName);

        // Filter products based on the selected category
        let filteredProducts;
        // if (categoryName === 'All') {
        //     filteredProducts = productsList; // Reset to all products

        // } else {
        //     filteredProducts = productsList.filter((product) => product.category.join(",") === categoryName);
        // }
        filteredProducts = productsList.filter((product) => product.category.join(",") === categoryName);


        // Check if the filtered product list is empty
        if (filteredProducts.length === 0) {
            setNoProductsFound(true); // Set noProductsFound to true if no products are found
            setproducts([]); // Clear the product list so no images are shown
        } else {
            setNoProductsFound(false); // Reset noProductsFound if products exist
            setproducts(filteredProducts); // Update the filtered products
        }

        // Reset carousel index to show the first product and image
        setHorizontalIndex(0);
        setVerticalIndex(0);
    };

// --------- HANDLING MAIN PRODUCTS CAROUSEL COLLECTION TO SHOW SUB-COLLECTIONS -----
    const handleMainProductsCollection = (categoryName) => {
       
        // Filter products based on the selected category
        let filteredProducts;
      
        filteredProducts = productsList.filter((product) => product.category.join(",") === categoryName);

        // Check if the filtered product list is empty
        if (filteredProducts.length === 0) {
            setNoProductsFound(true); // Set noProductsFound to true if no products are found
            setproducts([]); // Clear the product list so no images are shown
        } else {
            setNoProductsFound(false); // Reset noProductsFound if products exist
            setproducts(filteredProducts); // Update the filtered products
        }

        // Reset carousel index to show the first product and image
        setHorizontalIndex(0);
        setVerticalIndex(0);
    };

    
    
    //-------------- handle search query for product filtering --------
    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filteredImages = productsList.filter((product) =>
            product.title.toLowerCase().includes(query)
        );

        if (filteredImages.length === 0) {
            setNoProductsFound(true); // Set noProductsFound to true if no products are found
            setproducts([]); // Clear the product list so no images are shown
        } else {
            setNoProductsFound(false); // Reset noProductsFound if products exist
            setproducts(filteredImages); // Update the filtered products
        }
        setHorizontalIndex(0);
        setVerticalIndex(0);
    }

    // --- select one of the carousel product -----
    const handleCarouselProduct = (product) => {
        setHorizontalIndex(product);
        // setGallery((prev) => !prev)
    }

    // Function to update the state based on the screen width
    const checkScreenWidth = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth > 388) {
            setIsMobileWidth(true);
        } else {
            setIsMobileWidth(false);
        }
    };

    useEffect(() => {

        // Handle positive and negative indices for infinite carousel effect
        if (horizontalIndex >= products?.length) {
            setHorizontalIndex(0); // Reset to first product
        } else if (horizontalIndex < 0) {
            setHorizontalIndex(products?.length - 1); // Go to last product
        }
    }, [horizontalIndex]);

    // useEffect for categories and device screen width tracking
    useEffect(() => {
        const filteredProducts = productsList?.filter((product) => product?.category.join(",") === category);
        // Check if the filtered product list is empty
        if (filteredProducts.length === 0) {
            setNoProductsFound(true); // Set noProductsFound to true if no products are found
            setproducts([]); // Clear the product list so no images are shown
        } else {
            setNoProductsFound(false); // Reset noProductsFound if products exist
            setproducts(filteredProducts); // Update the filtered products
        }

        // Check the screen width when the component mounts
        checkScreenWidth();

        // Listen for window resize and update the state accordingly
        window.addEventListener('resize', checkScreenWidth);

        // Cleanup listener on component unmount
        return () => window.removeEventListener('resize', checkScreenWidth);
    }, [])


    return (
        <>

            <div className="w-full h-full absolute z-20 ">
                <div className={`w-full h-auto flex flex-col gap-2 pb-4   cursor-pointer ${isMobileWidth ? "mt-[3.3rem]" : "mt-[2.5rem]"}  bg-[#FEFCEB]`}>
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
                                {/* ------------- main product collection  ----------- */}
                                {/* <Carousal products={products} handleCarouselProduct={handleCarouselProduct} /> */}
                                <Main_Carousel handleMainProductsCollection={handleMainProductsCollection} />
                                 
                                
                                {/* ------------- Carousal section END ----------- */}

                                {/* below code is for search bar */}
                                <div className={`w-full  z-50 top-[6.4rem] flex justify-between items-center h-[28%]   ${isSearchTrue ? "absolute" : "hidden"}`}
                                
                                    style={{
                                        transformStyle: "preserve-3d",
                                        transition: "transform 1s ease-in-out",
                                    }}>
                                    <div className=" w-[85%] h-full border border-gray-500 ">
                                        <input
                                            type="text"
                                            className="w-full h-full grow pl-10 pr-3 py-2 border rounded-lg outline-0"
                                            style={{ border: '0px' }}
                                            placeholder="Search"
                                            value={searchQuery} // Bind the input value to the searchQuery state
                                            onChange={handleSearchChange} // Call the handler on change
                                        />

                                        <svg
                                            className="absolute inset-y-0 left-0 ml-3 mt-3 w-6 h-6 text-gray-100"
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

                                    <div className="w-[15%] bg-slate-100 text-2xl flex justify-center items-center h-full " onClick={()=> setIsSearchTrue((prev)=> !prev)}>
                                        
                                            <AiOutlineClose  />
                                    </div>
                                </div>

                                <div className="w-full h-9  flex flex-row justify-between items-center mt-[12px]">
                                    {categories.map((cate) => (
                                        <button
                                            key={cate}
                                            className={` ${isMobileWidth ? "min-w-[19%]" : "min-w-[17%]"}  max-w-auto h-full p-2 flex flex-row justify-center items-center rounded-md ${category === cate
                                                ? 'bg-black text-white'
                                                : 'bg-[#ECECEC] text-black'
                                                }`}
                                            onClick={() => handleCategory(cate)}
                                        >
                                            {cate.charAt(0).toUpperCase() + cate.slice(1)}
                                        </button>
                                    ))}
                                    {/* ---- search icon ------- */}
                                    <div className="p-2 bg-[#ECECEC] text-2xl flex justify-center items-center h-full   " onClick={()=> setIsSearchTrue((prev)=> !prev)}>

                                        <RiSearchLine />
                                    </div>
                                </div>

                            </div>

                            {/* -------- selected product sub-category  collection  ----------- */}
                            {isSubCategory && <SubCollectionCarousal products={products} handleCarouselProduct={handleCarouselProduct} /> } 

                        </div>
                    </div>
                </div>

                {/* ---- BELOW CODE IS FOR SPINNING TOOL AND other top buttons */}
                <div className={`parent w-full z-10 ${isMobileWidth ? "h-[70%] " : "h-[60%] "}     ${isDarkMode ? 'bg-[#000000]' : 'bg-backgroundColortool'} `}>
                    <div className="w-full h-[8%] flex flex-row ">
                        <div className="w-[75%] h-full flex flex-row p-2 gap-3 ">
                            <img src="/splash/rect1.png" alt="rect1" className="ml-3 w-[1.5rem] h-[1.5rem]" onClick={handleGalleryScreen} />
                            <img src="/splash/rect2.png" alt="rect1" className=" w-[1.5rem] h-[1.5rem]" onClick={showProductDescription} />
                            <img src="/splash/rect3.png" alt="rect1" className=" w-[1.5rem] h-[1.5rem]" onClick={handleIsFeatures} />
                        </div>

                        {/* ---------- dark/light mode container -------- */}
                        <div className="w-[3.5rem] mt-2 h-[1.5rem] flex flex-row justify-between rounded-xl items-center border border-gray-300 px-1 py-2 " onClick={ThemeMode}>
                            {/* light mode button */}
                            <div className=" w-full flex justify-start items-center">
                                <div className={`light-mode-btn justify-center items-center w-[1.3rem] h-[1.3rem] rounded-full bg-white ${isDarkMode ? 'hidden' : "flex"}`} style={{ borderRadius: "100%" }}  >
                                    <img src="/splash/light-mode.png" alt="light-mode" className='w-[1.5rem] ' />
                                </div>
                            </div>

                            {/* dark mode mode button */}
                            <div className="wrapper w-full flex justify-end items-center">
                                <div className={`light-mode-btn   justify-center items-center w-[1.3rem] h-[1.2rem] rounded-full bg-gray-500 ${!isDarkMode ? 'hidden' : "flex"}`} style={{ borderRadius: "100%" }}>
                                    <img src="/splash/dark-mode.png" alt="light-mode" className='w-[1.5rem] ' />
                                </div>
                            </div>

                        </div>

                    </div>


                    <div className="w-full flex flex-col h-[88%]  relative  ">
                        <div
                            className=" relative w-[98%] h-full flex ml-1 flex-row justify-center items-center overflow-hidden"
                            id="center"
                        >
                            {/* =============== Below is the product spinning tools =============== */}

                            <div className="carousel-container relative flex justify-center items-center w-full"
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    height: "100%",
                                    perspective: "1000px",
                                }}
                                onTouchStart={!IsShowProductDesc ? handleTouchStart : null}
                                onTouchMove={!IsShowProductDesc ? handleTouchMove : null}
                                onTouchEnd={!IsShowProductDesc ? handleTouchEnd : null}
                            >
                                {noProductsFound ? (
                                    <div className="no-products-message text-[1.8rem] font-semibold bg-[#FEFCEB] text-red-600" style={{ textAlign: 'center', padding: '20px' }}>
                                        <h2>Oops! No products found.</h2>
                                    </div>
                                ) : (
                                    <>
                                        {/* Vertical carousel (rotate around X-axis) */}
                                        <div
                                            className="carousel w-full h-full"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                position: 'absolute',
                                                transformStyle: "preserve-3d",
                                                transition: "transform 1.3s ease-in-out",
                                                zIndex: activeCarousel === "vertical" ? 2 : 1,
                                                transform: `rotateX(${verticalIndex * -rotationPerPanel}deg)`,
                                            }}
                                        >
                                            {currentProductImages.map((image, index) => {
                                                const rotateAngle = index * rotationPerPanel;

                                                return (
                                                    <div
                                                        className="carousel-panel "
                                                        key={index}
                                                        style={{
                                                            position: 'absolute',
                                                            transition: "transform 4s ease-in-out",
                                                            width: '100%',
                                                            height: '100%',
                                                            backfaceVisibility: 'hidden',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            transform: `rotateX(${rotateAngle}deg) translateZ(${isMobileWidth ? '197px' : "164px" })`,
                                                        }}
                                                    >
                                                        <div className={`panel-content ${isMobileWidth ? 'w-72 h-72' : " w-60 h-60" } `}
                                                            style={{
                                                                // width: "215px",
                                                                // height: "225px",
                                                                transition: "transform 4s ease-in-out",
                                                                background: "#979494",
                                                                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                                                                objectFit: "cover",
                                                                overflow: "hidden"
                                                            }}
                                                        >
                                                            <img style={{ objectFit: "cover", width: "100%", height: "100%", transition: "transform 4s ease-in-out", }} src={image} alt="vertical-carousel-img" />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Horizontal carousel (rotate around Y-axis) */}
                                        <div
                                            className="carousel-horizontal"
                                            style={{
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                transformStyle: "preserve-3d",
                                                backfaceVisibility: 'hidden',
                                                transition: "transform 1.3s ease-in-out",
                                                zIndex: activeCarousel === "horizontal" ? 2 : 1,
                                                transform: `rotateY(${(horizontalIndex % duplicatedProducts.length) * -rotationPerPanel}deg)`,
                                            }}
                                        >
                                            {duplicatedProducts.map((product, index) => {
                                                const rotateAngle = index * rotationPerPanel;

                                                return (
                                                    <div
                                                        className="carousel-panel"
                                                        key={index}
                                                        style={{
                                                            position: 'absolute',
                                                            width: '100%',
                                                            height: '100%',
                                                            backfaceVisibility: 'hidden',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            transform: `rotateY(${rotateAngle}deg) translateZ(${isMobileWidth ? '197px' : "164px" })`,
                                                        }}
                                                    >
                                                        <div className={`panel-content ${isMobileWidth ? 'w-72 h-72' : " w-60 h-60"} `}
                                                            style={{
                                                                // width: "215px",
                                                                // height: "225px",
                                                                background: "#979494",
                                                                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                                                                objectFit: "cover",
                                                                overflow: "hidden"
                                                            }}
                                                        >
                                                            <img style={{ objectFit: "cover", width: "100%", height: "100%" }} src={product.featuredImage
                                                            } alt={product.name} />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}
                                {/* ----------- product description ------- */}
                                {IsShowProductDesc && <ProductDetail product={productsList[horizontalIndex]} isDarkMode={isDarkMode} />}
                            </div>


                            {/* ------- spinning tools section END -------- */}



                        </div>
                    </div>
                </div>

                {/* showing product gallery */}
                {IsGallery && <ProductGallery isDarkMode={isDarkMode} setgallery={setGallery} galleryImages={products[horizontalIndex].images} />}
                {/* showing features actions */}
                {IsfeaturesMode && <Features isDarkMode={isDarkMode} category={category} setCategory={setCategory} setIsfeaturesMode={setIsfeaturesMode} product={products[horizontalIndex]} />}
            </div>

        </>
    );
}
