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
    const { collections } = await storefront.query(FEATURED_COLLECTION_QUERY);
    const featuredCollection = collections.nodes[0];
    const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

    return defer({ featuredCollection, recommendedProducts });
}

// =============== BELOW IS THE SPINSWIPE FUNCTIONALITY ============
export const productsList = [
    {
        name: "Watch",
        category: "women",
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrrvRWDpRts3ffsdJKXCCqzfSaLNGc2Bxc5g&s",
            "https://www.carlington.in/cdn/shop/files/Carlington_elite_analog_ladies_watch_CT_2007_roseblack.jpg?v=1696689556&width=2400",
            "https://currenwatches.com.pk/cdn/shop/files/S16a1d22aca9244a19944aad7e16f364fh_1445x.jpg?v=1708428048",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXLu03PFPFQhLEfU4QZualjO6dRe72PwhXOFk1lYQQxtCRS5zlxvXStz-zk2WzDCG0-2M&usqp=CAU",
        ],
    },
    {
        name: "Bracelet",
        category: "women",
        images: [
            "https://diamondemitations.pk/cdn/shop/files/IMG-20240605-WA0093_1000x1000.jpg?v=1717672714",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8xSgWNrF32EeAqOPtf6BUn9wYZWMi1FOe7cYyPQIh0MnDThKX4J5fy7osgnZQpCqNE_Q&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR04UuoqlpCZKubmbVCvIyCtj8ktnHay-RS2Js3jszT-_XldfOJMKGnetrRCzQcClSzTtg&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAm1gnL5cNDxWPOZ9YkPDHbyhOvrbseQuXsw&s",
        ],
    },
    {
        name: "Digital Watch",
        category: "men",
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9bHc_0BGcC1eugUGxkA_gF9wIG7fra0akPQ&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVvAegXrjgE3-rpYQ9szDcoJIja9PjdUElRbgpDG6Fhy9vcFWAIA3vvtbkGW-Z1dm3SnY&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLzTqmLasXgW1G_44RF5T3KxWjHKG4SefL_g&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSObsa0JVuB5WJRu-jk_kX-dAucj40tVAqls4EI9rVLT2s_40mCHJd9xiE2SJ1E1eq9M2U&usqp=CAU",
        ],
    },
    {
        name: "T-Shirt",
        category: "men",
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3JySzx0pdzRnn6rV0dkwapAJIsSeNFYouLQ&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU2XTWD-p2c6QeaaF7tqSxHfpgiOfYtBp4xw&s",
            "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/white-transparent-background-t-shirt-design-template-b57a5ce5ec3ad2f32ea38e8c5fd32827_screen.jpg?ts=1698350978",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP10zvEXDk0A7V5eSf1aVm9N9UskGrBrWB1w&s",
        ],
    },
    {
        name: "Digital Watch 2",
        category: "men",
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9bHc_0BGcC1eugUGxkA_gF9wIG7fra0akPQ&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVvAegXrjgE3-rpYQ9szDcoJIja9PjdUElRbgpDG6Fhy9vcFWAIA3vvtbkGW-Z1dm3SnY&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLzTqmLasXgW1G_44RF5T3KxWjHKG4SefL_g&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSObsa0JVuB5WJRu-jk_kX-dAucj40tVAqls4EI9rVLT2s_40mCHJd9xiE2SJ1E1eq9M2U&usqp=CAU",
        ],
    },
];

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



export default function HomepageCopy() {
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
    const [products, setproducts] = useState(productsList);

    const [currentProductIdx, setCurrentProductIdx] = useState(0); // Track the current product index

    const [IsGallery, setGallery] = useState(false);
    const [category, setCategory] = useState("all");
    const [IsShowProductDesc, setShowProductDesc] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');


    const [horizontalIndex, setHorizontalIndex] = useState(0); // For X-axis carousel
    const [verticalIndex, setVerticalIndex] = useState(0); // For Y-axis carousel
    const [activeCarousel, setActiveCarousel] = useState("horizontal"); // Track active carousel


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
                // setVerticalIndex(0); // Reset vertical index
            } else if (touchEndX - touchStartX > 50) {
                // Swipe right (previous panel)
                setHorizontalIndex((prevIndex) => (prevIndex - 1));
                // setVerticalIndex(0); // Reset vertical index
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
        if (categoryName === 'all') {
            filteredProducts = productsList; // Reset to all products

        } else {
            filteredProducts = productsList.filter((product) => product.category === categoryName);
        }

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
            product.name.toLowerCase().includes(query)
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
        setCurrentProductIdx(products);
        setGallery((prev) => !prev)
    }


    useEffect(() => {
        // Handle positive and negative indices for infinite carousel effect
        if (horizontalIndex >= products.length) {
            setHorizontalIndex(0); // Reset to first product
        } else if (horizontalIndex < 0) {
            setHorizontalIndex(products.length - 1); // Go to last product
        }
    }, [horizontalIndex]);

    return (
        <>

            <div className="w-full h-full absolute z-20 ">
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
                <div className={`w-full h-[56%]   ${isDarkMode ? 'bg-[#000000]' : 'bg-backgroundColortool'} `}>
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


                    <div className="w-full h-full flex flex-col  relative  ">
                        <div className="w-full h-[88%]   ">

                           

                                    <div
                                        className=" relative  w-[98%] h-full flex flex-row justify-center items-center overflow-hidden "
                                        id="center"
                                    >
                   {/* =============== Below is the product spinning tools =============== */}
                                       
                                <div className="carousel-container relative flex justify-center items-center"
                                    style={{
                                        position: "relative",
                                        width: "400px",
                                        height: "600px",
                                        perspective: "1000px",
                                    }}
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                >
                                    {noProductsFound ? (
                                        <div className="no-products-message text-[1.8rem] font-semibold bg-gray-400 text-red-600" style={{ textAlign: 'center', padding: '20px' }}>
                                            <h2>Oops! No products found.</h2>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Vertical carousel (rotate around X-axis) */}
                                            <div
                                                className="carousel"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    position: 'absolute',
                                                    transformStyle: "preserve-3d",
                                                    transition: "transform 1s ease-in-out",
                                                    zIndex: activeCarousel === "vertical" ? 2 : 1,
                                                    transform: `rotateX(${verticalIndex * -rotationPerPanel}deg)`,
                                                }}
                                            >
                                                {currentProductImages.map((image, index) => {
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
                                                                transform: `rotateX(${rotateAngle}deg) translateZ(153px)`,
                                                            }}
                                                        >
                                                            <div className="panel-content"
                                                                style={{
                                                                    width: "215px",
                                                                    height: "225px",
                                                                    background: "#979494",
                                                                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                                                                    objectFit: "cover",
                                                                    overflow: "hidden"
                                                                }}
                                                            >
                                                                <img style={{ objectFit: "cover", width: "215px", height: "225px" }} src={image} alt="vertical-carousel-img" />
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
                                                    transition: "transform 1s ease-in-out",
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
                                                                transform: `rotateY(${rotateAngle}deg) translateZ(148px)`,
                                                            }}
                                                        >
                                                            <div className="panel-content"
                                                                style={{
                                                                    width: "215px",
                                                                    height: "225px",
                                                                    background: "#979494",
                                                                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                                                                    objectFit: "cover",
                                                                    overflow: "hidden"
                                                                }}
                                                            >
                                                                <img style={{ objectFit: "cover", width: "215px", height: "225px" }} src={product.images[0]} alt={product.name} />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}
                                    {/* ----------- product description ------- */}
                                    {IsShowProductDesc && <ProductDetail isDarkMode={isDarkMode} />}
                                </div>


                                        {/* ------- spinning tools section END -------- */}

                                       

                                    </div>

                           
                        </div>
                    </div>
                </div>
                {/* --- Ending the toggle functionality by chaning bg-dark and gray accordingly. */}

                {/* showing product gallery */}
                {IsGallery && <ProductGallery isDarkMode={isDarkMode} setgallery={setGallery} galleryImages={products[horizontalIndex].images} />}
                {/* showing features actions */}
                {IsFeaturePageOpened && <Features isDarkMode={isDarkMode} productImg={products[horizontalIndex].images[verticalIndex]} />}
            </div>

        </>
    );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({ collection }) {
    if (!collection) return null;
    const image = collection?.image;
    return (
        <Link
            className="featured-collection"
            to={`/collections/${collection.handle}`}
        >
            {image && (
                <div className="featured-collection-image">
                    <Image data={image} sizes="100vw" />
                </div>
            )}
            <h1>{collection.title}</h1>
        </Link>
    );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery>;
 * }}
 */
function RecommendedProducts({ products }) {
    return (
        <div className="recommended-products">
            <h2>Recommended Products</h2>
            <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={products}>
                    {({ products }) => (
                        <div className="recommended-products-grid">
                            {products.nodes.map((product) => (
                                <Link
                                    key={product.id}
                                    className="recommended-product"
                                    to={`/products/${product.handle}`}
                                >
                                    <Image
                                        data={product.images.nodes[0]}
                                        aspectRatio="1/1"
                                        sizes="(min-width: 45em) 20vw, 50vw"
                                    />
                                    <h4>{product.title}</h4>
                                    <small>
                                        <Money data={product.priceRange.minVariantPrice} />
                                    </small>
                                </Link>
                            ))}
                        </div>
                    )}
                </Await>
            </Suspense>
            <br />
        </div>
    );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;
/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
