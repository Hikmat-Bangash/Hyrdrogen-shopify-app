// eslint-disable-next-line eslint-comments/disable-enable-pair
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-static-element-interactions */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable prettier/prettier */
import { Suspense, useEffect, useRef, useState } from 'react';
import ProductGallery from '~/components/productGallery';
import Features from '~/components/Features';
import ProductDetail from '~/components/productDetail';
import { useSelector, useDispatch } from 'react-redux';
import { hanldeFeaturePage, toggleThemeMode } from '~/redux-toolkit/slices/index.slice';
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

    // If there are fewer than 5 products, duplicate them to reach 5
    if (totalItems < PANEL_COUNT) {
        let i = 0;
        while (result.length < PANEL_COUNT) {
            // Append the next item in the original sequence
            const nextItem = items[i % totalItems];

            // Ensure no consecutive duplicates
            if (result[result.length - 1] !== nextItem) {
                result.push(nextItem);
            }

            i++;
        }
    }

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


export default function HomepageCopy({ sproducts, collectionsData }) {
    const isDarkMode = useSelector((state) => state?.themeMode?.isDarkMode);
    const dispatch = useDispatch();

    const categories = ["All", "Mens", "Women", "Kids"]
    const [IsfeaturesMode, setIsfeaturesMode] = useState(false);
    // const [Images, setImages] = useState(images);
    const [products, setproducts] = useState([]);


    const [IsGallery, setGallery] = useState(false);
    const [category, setCategory] = useState("All");
    const [IsShowProductDesc, setShowProductDesc] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [horizontalIndex, setHorizontalIndex] = useState(0); // For X-axis carousel
    const [verticalIndex, setVerticalIndex] = useState(0); // For Y-axis carousel
    const [activeCarousel, setActiveCarousel] = useState("horizontal"); // Track active carousel
    const [isMobileWidth, setIsMobileWidth] = useState(true);
    const [isSearchTrue, setIsSearchTrue] = useState(false);

    const [filteredCollections, setFilteredCollections] = useState([]);
    const [filteredAllCollectionsProduct, setfilteredAllCollectionsProduct] = useState([]);
    const [noProductsFound, setNoProductsFound] = useState(false); // State to track if products are found or not
    const [IsDisplaySubCarousel, setIsDisplaySubCarousel] = useState(false);

    // changing light and dark mode func def
    const ThemeMode = () => {
        dispatch(toggleThemeMode())
    }

    // -------- handle features screen ----
    const handleIsFeatures = () => {
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
    const [isSpinning, setIsSpinning] = useState(false); // Track if the carousel is spinning
    const spinningInterval = useRef(null); // Store the interval ID


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

        if (horizontalSwipe && !verticalSwipe) {
            setActiveCarousel("horizontal");
            startSpinning(touchStartX > touchEndX ? "right" : "left"); // Start spinning based on swipe direction
        }

        // Handle vertical swipes (up and down) for vertical carousel
        if (!isSpinning) {
            if (verticalSwipe && !horizontalSwipe) {
                setActiveCarousel("vertical"); // Set vertical carousel as active
                const productImages = products[horizontalIndex % products.length]?.images || [];
                const duplicatedImages = duplicateVerticalPanels(productImages);
                if (touchStartY - touchEndY > 50) {
                    // Swipe up (next panel)
                    setVerticalIndex((prevIndex) => (prevIndex - 1) % duplicatedImages.length);
                } else if (touchEndY - touchStartY > 50) {
                    // Swipe down (previous panel)
                    setVerticalIndex((prevIndex) =>
                        prevIndex === 0 ? duplicatedImages.length + 1 : prevIndex + 1
                    );
                }
            }
        }


    };

    const [normalizedIndex, setnormalizedIndex] = useState(((horizontalIndex % products?.length) + products?.length) % products?.length)
    // start Spinning function
    const startSpinning = (direction) => {
        if (spinningInterval.current) return; // Prevent multiple intervals
        setIsSpinning(true);

        spinningInterval.current = setInterval(() => {
            setHorizontalIndex((prevIndex) => {
                // Increment or decrement without wrapping using modulus
                return direction === "right" ? prevIndex + 1 : prevIndex - 1;
            });

        }, 1500); // Adjust interval time for spinning speed
    };

    // Stop spinning and update Y-axis variants
    const stopSpinning = () => {
        setIsSpinning(false);
        clearInterval(spinningInterval.current);
        spinningInterval.current = null;

        // Reset vertical index to sync with horizontalIndex once spinning stops
        setVerticalIndex(0);
        setTimeout(() => setVerticalIndex(1), 1000); // Delay for Y-axis variant reset
    };

    // Handle click event to stop spinning
    const handleCarouselClick = () => {
        if (isSpinning) {
            stopSpinning();
        }
    };




    //-------------- handle search query for product filtering --------
    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filteredImages = filteredAllCollectionsProduct.filter((product) =>
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
        if (screenWidth > 390) {
            setIsMobileWidth(true);
        } else {
            setIsMobileWidth(false);
        }
    };

    //================= Function to filter collections and their products ==============
    const FilteringCollectionsAndProducts = (filteredName) => {
        setCategory(filteredName);

        const filterLower = filteredName.toLowerCase();

        const matchedProducts = [];

        // Filter the collections and their products based on the filter
        const filtered = collectionsData?.map((collection) => {
            // Filter products in the collection based on the first tag in the array
            const filteredProductsInCollection = collection?.products.filter((product) => {
                const firstTag = product?.tags[0]?.toLowerCase(); // Get the first tag and convert it to lowercase
                return firstTag === filterLower;  // Filter if 'all' or matches the filter name
            });

            // Add the filtered products to the matchedProducts array
            matchedProducts.push(...filteredProductsInCollection); // Spread operator to push all filtered products

            // Only include collections that have matching products
            if (filteredProductsInCollection.length > 0) {
                return {
                    ...collection,
                    products: filteredProductsInCollection,  // Store only the filtered products
                };
            }

            return null;
        }).filter(Boolean);  // Filter out any null values (collections with no matching products)

        if (filtered?.length > 0) {
            setFilteredCollections(filtered);
            setfilteredAllCollectionsProduct(matchedProducts);
            setNoProductsFound(false); // Reset noProductsFound if products exist
            setproducts(matchedProducts); // Update the filtered products
        } else {
            setFilteredCollections([]);
            setfilteredAllCollectionsProduct([]);
            setNoProductsFound(true); // Reset noProductsFound if products exist
            setproducts([]); // Update the filtered products
        }
        // Reset carousel index to show the first product and image
        setHorizontalIndex(0);
        setVerticalIndex(0);
        setIsDisplaySubCarousel(false);
    };

    // Function to handle clicking on a collection and showing its products
    const handleCollectionClick = (collectionId) => {
        // Find the clicked collection by its ID
        const clickedCollection = filteredCollections.find(collection => collection.id === collectionId);

        // If the collection exists, set its products into the currentProducts state
        if (clickedCollection) {
            setproducts(clickedCollection.products);
            setIsDisplaySubCarousel(true);
        }
    };

    // useEffect for categories and device screen width tracking
    useEffect(() => {

        FilteringCollectionsAndProducts('All');
        setIsDisplaySubCarousel(false);


        // Check the screen width when the component mounts
        checkScreenWidth();

        // Listen for window resize and update the state accordingly
        window.addEventListener('resize', checkScreenWidth);

        // Cleanup listener on component unmount
        return () => window.removeEventListener('resize', checkScreenWidth);
    }, [])

    // Clean up interval on unmount
    useEffect(() => {
        return () => clearInterval(spinningInterval.current);
    }, []);

    // Get the random panels for both carousels if the no of products less than 5
    const currentProduct = products[normalizedIndex] || {};
    const currentProductImages = duplicateVerticalPanels(currentProduct.images || []);
    const duplicatedProducts = createNonDuplicateOrder(products);

    console.log("center product index: ", (((horizontalIndex % products?.length) + products?.length) % products?.length))

    return (
        <>

            <div className="w-full h-full absolute z-20 ">
                <div className={`w-full h-auto flex flex-col gap-2 pb-4   cursor-pointer ${isMobileWidth ? "mt-[3rem]" : "mt-[2.4rem]"}  bg-[#FEFCEB]`}>
                    <div className="w-full h-full flex flex-col items-center">

                        {/* </Link> */}
                        <div className="w-[90%] h-[75%] cursor-pointer ">
                            <div className="w-full h-full relative ">
                                <h1
                                    className='text-[#DAAF37] font-avenir'
                                    style={{
                                        fontSize: '20px',
                                        fontWeight: '700',
                                        lineHeight: '34px',
                                        letterSpacing: '0em',
                                        textAlign: 'left',
                                    }}
                                >
                                    Kelly&apos;s Kapsule
                                </h1>


                                {/* below code is for search bar */}
                                <div className={`w-full  z-50 top-[5.8rem] flex justify-between items-center h-[32%]   ${isSearchTrue ? "absolute" : "hidden"}`}

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

                                    <div className="w-[15%] bg-slate-100 text-2xl flex justify-center items-center h-full " onClick={() => setIsSearchTrue((prev) => !prev)}>

                                        <AiOutlineClose />
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
                                            onClick={() => FilteringCollectionsAndProducts(cate)}
                                        >
                                            {cate.charAt(0).toUpperCase() + cate.slice(1)}
                                        </button>
                                    ))}
                                    {/* ---- search icon ------- */}
                                    <div className="p-2 bg-[#ECECEC] text-2xl flex justify-center items-center h-full   " onClick={() => setIsSearchTrue((prev) => !prev)}>

                                        <RiSearchLine />
                                    </div>
                                </div>

                                <Main_Carousel collections={filteredCollections} handleMainProductsCollection={handleCollectionClick} />

                            </div>

                            {/* -------- selected product sub-category  collection  ----------- */}
                            {IsDisplaySubCarousel && <SubCollectionCarousal products={products} handleCarouselProduct={handleCarouselProduct} />}

                        </div>
                    </div>
                </div>

                {/* ---- BELOW CODE IS FOR SPINNING TOOL AND other top buttons -----*/}
                <div className={`parent w-full z-10 ${isMobileWidth ? IsDisplaySubCarousel ? "h-[65%]" : "h-[71%]" : IsDisplaySubCarousel ? "h-[60%]" : "h-[65%]"}     ${isDarkMode ? 'bg-[#000000]' : 'bg-backgroundColortool'} `}>
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
                            className=" relative w-[98%] h-full flex ml-1 flex-row  overflow-hidden "
                            id="center"
                        >
                            {/* =============== Below is the product spinning tools =============== */}

                            <div className="carousel-container relative flex w-full "
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    height: "100%",
                                    perspective: "1000px",
                                }}
                                onTouchStart={!IsShowProductDesc ? handleTouchStart : null}
                                onTouchMove={!IsShowProductDesc ? handleTouchMove : null}
                                onTouchEnd={!IsShowProductDesc ? handleTouchEnd : null}
                                onClick={handleCarouselClick} // Add click handler to stop spinning
                            >
                                {noProductsFound ? (
                                    <div className="no-products-message w-full h-[70%] flex justify-center items-center  text-[1.8rem] font-semibold  text-red-600" >
                                        <h2 className='bg-gray-300 py-8'>Oops! No products found.</h2>
                                    </div>
                                ) : (
                                    <>
                                        {/* Vertical carousel (rotate around X-axis) */}
                                        <div
                                            className={`carousel w-full h-full `}
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
                                            {currentProductImages?.map((image, index) => {
                                                const rotateAngle = index * rotationPerPanel;

                                                return (
                                                    <div
                                                        className={`carousel-panel ${activeCarousel == "horizontal" && "backdrop-blur-sm"}`}
                                                        key={index}
                                                        style={{
                                                            position: 'absolute',
                                                            transition: "transform 1.3s ease-in-out",
                                                            width: '100%',
                                                            height: '100%',
                                                            backfaceVisibility: 'hidden',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            transform: `rotateX(${rotateAngle}deg) translateZ(${isMobileWidth ? '189px' : "148px"})`,
                                                        }}
                                                    >
                                                        <div className={`panel-content ${isMobileWidth ? 'w-[16.5rem] h-[17.3rem]' : " w-[13.2rem] h-[13.7rem]"} `}
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
                                            className="carousel-horizontal z-40"
                                            style={{
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                transformStyle: "preserve-3d",
                                                backfaceVisibility: 'hidden',
                                                transition: "transform 1.3s ease-in-out",
                                                zIndex: activeCarousel === "horizontal" ? 2 : 1,
                                                transform: `rotateY(${horizontalIndex * -rotationPerPanel}deg)`,
                                            }}
                                        >
                                            {duplicatedProducts?.map((product, index) => {
                                                const rotateAngle = index * rotationPerPanel;

                                                return (
                                                    <div
                                                        className="carousel-panel z-40"
                                                        key={index}
                                                        style={{
                                                            position: 'absolute',
                                                            width: '100%',
                                                            height: '100%',
                                                            backfaceVisibility: 'hidden',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            transform: `rotateY(${rotateAngle}deg) translateZ(${isMobileWidth ? '181px' : "145px"})`,
                                                        }}
                                                    >
                                                        <div className={`panel-content z-40 ${isMobileWidth ? 'w-[16.7rem] h-72' : " w-[13.2rem] h-[13.2rem]"} `}
                                                            style={{
                                                                // width: "215px",
                                                                // height: "225px",
                                                                background: "#979494",
                                                                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                                                                objectFit: "cover",
                                                                overflow: "hidden"
                                                            }}
                                                        >
                                                            <img style={{ objectFit: "cover", width: "100%", height: "100%" }} src={product?.featuredImage
                                                            } alt={product?.title} />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}
                                {/* ----------- product description ------- */}
                                {IsShowProductDesc && <ProductDetail IsDisplaySubCarousel={IsDisplaySubCarousel} isMobileWidth={isMobileWidth} product={filteredAllCollectionsProduct[normalizedIndex]} isDarkMode={isDarkMode} />}
                            </div>




                        </div>
                    </div>
                </div>

                {/* showing product gallery */}
                {IsGallery && <ProductGallery isDarkMode={isDarkMode} setgallery={setGallery} galleryImages={products[normalizedIndex].images} />}
                {/* showing features actions */}
                {IsfeaturesMode && <Features isDarkMode={isDarkMode} category={category} setCategory={setCategory} setIsfeaturesMode={setIsfeaturesMode} product={products[normalizedIndex]} />}
            </div>

        </>
    );
}