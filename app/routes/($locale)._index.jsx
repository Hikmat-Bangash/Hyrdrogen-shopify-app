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
import {Await, Link} from '@remix-run/react';
import {Suspense, useRef, useState} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import ProductGallery from '~/components/productGallery';
import Features from '~/components/Features';
import ProductDetail from '~/components/productDetail';
import { useSelector, useDispatch } from 'react-redux';
import { toggleThemeMode } from '~/redux-toolkit/slices/index.slice';
import "../styles/homepage.css"


/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

/**
 * @param {LoaderFunctionArgs}
 */

export async function loader({context}) {
  const {storefront} = context;
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollection = collections.nodes[0];
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  return defer({featuredCollection, recommendedProducts});
}


export default function Homepage() {
  /** @type {LoaderReturnData} */
  const isDarkMode = useSelector((state) => state?.themeMode?.isDarkMode);
  const dispatch = useDispatch();
  

  const images = [
    {
      category: 'men',
      variants: ["/splash/watch1.png", "/splash/watch2.png", "/splash/watch3.png", "/splash/watch4.png", "/splash/watch5.png"]
    },
    {
      category: 'women',
      variants: ["/splash/bracelet1.png", "/splash/bracelet2.png", "/splash/bracelet3.png"]
    },
    {
      category: 'men',
      variants: ["/splash/shart1.png", "/splash/shart2.png", "/splash/shart3.png"]
    },
    {
      category: 'men',
      variants: ["/splash/digital-watch1.png", "/splash/digital-watch2.png", "/splash/digital-watch3.png", "/splash/digital-watch4.png"]
    },
  ];

  const categories = ["all", "men", "women", "kids"]
  const [IsfeaturesMode, setIsfeaturesMode] = useState(false);
  const [Images, setImages] = useState(images);

  const [currentProductIdx, setCurrentProductIdx] = useState(0); // Track the current product index
  const [currentVariantIdx, setCurrentVariantIdx] = useState(0); // Track the current variant index
   
  const [IsGallery, setGallery] = useState(false);
  const [category, setCategory] = useState("all");
   
  const [IsShowProductDesc, setShowProductDesc] = useState(false);

  // changing light and dark mode func def
  const ThemeMode = () => {
    dispatch(toggleThemeMode())
  }

  // -------- handle features screen ----
  const handleIsFeatures = () => {

    setIsfeaturesMode((prev) => !prev);
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
    if (direction === 'left') {
      setCurrentProductIdx((prev) => (prev + 1) % Images.length);
    } else if (direction === 'right') {
      setCurrentProductIdx((prev) => (prev - 1 + Images.length) % Images.length);
    }
    // Reset variant index to the first variant when the product changes
    setCurrentVariantIdx(0);
  };


  // Handle Y-axis swipe (up/down)
  const handleSwipeY = (direction) => {
    const variants = Images[currentProductIdx]?.variants || [];
    if (variants.length === 0) return;  // Check to avoid errors if variants array is empty

    if (direction === 'up') {
      setCurrentVariantIdx((prev) => (prev + 1) % variants.length);
    } else if (direction === 'down') {
      setCurrentVariantIdx((prev) => (prev - 1 + variants.length) % variants.length);
    }
  };

  // Unified swipe handler based on direction
  const handleSwipe = (direction) => {
    if (direction === 'left' || direction === 'right') {
      handleSwipeX(direction);
    } else if (direction === 'up' || direction === 'down') {
      handleSwipeY(direction);
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
      console.log("filteredImages Length: " + filteredImages.length)
    }

    setCurrentProductIdx(0);
    setCurrentVariantIdx(0);
  }

  return (
    <>
    
    <div className="w-full h-full absolute ">
      <div className="w-full h-[30%] cursor-pointer ">
        <div className="w-full h-full flex flex-col items-center">
          <div className="w-[90%] h-[25%] flex flex-row ">
  
            </div>
            
          {/* </Link> */}
          <div className="w-[90%] h-[75%] cursor-pointer ">
            <div className="w-full h-full relative ">
              <h1
                style={{
                  fontFamily: 'Avenir LT Std',
                  fontSize: '28px',
                  fontWeight: '700',
                  lineHeight: '34px',
                  letterSpacing: '0em',
                  textAlign: 'left',
                }}
              >
                Kelly&apos;s Kapsule
              </h1>
              <div className="w-full h-[25%]  mt-[25px]  relative ">
                <div className="relative w-[85%] h-full ">
                  <input
                    type="text"
                    className=" w-full h-full grow pl-10 pr-3 py-2 border rounded-lg outline-0  "
                    style={{border: '0px'}}
                    placeholder="Search"
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
                
              <div className="w-full h-[20%] flex flex-row justify-around absolute mt-[15px]">
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
            <img src="/splash/rect3.png" alt="rect1" onClick={handleIsFeatures}/>
          </div>

{/* ---------- dark/light mode container -------- */}
          <div className="w-[20%] mt-2 h-[2.3rem] flex flex-row justify-between rounded-full items-center border border-gray-300 px-1 py-2">
            {/* light mode button */}
            <div className="wrapper w-full flex justify-start items-center">
            <div className={`light-mode-btn justify-center items-center w-[2rem] h-[2rem] rounded-full bg-white ${isDarkMode ? 'hidden' : "flex"}`} style={{ borderRadius: "100%" }} onClick={ThemeMode}>
              <img src="/splash/light-mode.png" alt="light-mode" className='w-[1.5rem] '/>
              </div>
            </div>

            {/* dark mode mode button */}
            <div className="wrapper w-full flex justify-end items-center">
            <div className={`light-mode-btn  justify-center items-center w-[2rem] h-[2rem] rounded-full bg-gray-500 ${!isDarkMode ? 'hidden' : "flex"}`} style={{ borderRadius: "100%" }} onClick={ThemeMode}>
              <img src="/splash/dark-mode.png" alt="light-mode" className='w-[1.5rem] ' />
              </div>
            </div>
            
            {/* <input
              type="checkbox"
              className="toggle toggle-md text-white border-white"
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
            /> */}
              
          </div>
         
        </div>
        <div className="w-full h-full flex flex-col justify-center items-center relative ">
          <div className="w-full h-[90%]">
         
            <div className="w-full h-full flex flex-col ">
              <div className="w-full h-[15%] flex flex-row justify-center ">
                <div
                  className="w-[70%] h-full flex flex-row justify-center items-center  "
                  style={{
                    backgroundImage: isDarkMode ? "url('/splash/top1-dark.png')" : "url('/splash/top1.png')" ,
                    backgroundSize: '100% 100%',
                  }}
                  id="top"
                >
                  <img
                      src={Images[currentProductIdx]?.variants[(currentVariantIdx + 1) % Images[currentProductIdx].variants.length]}
                    alt="topImg"
                      className="w-[50px]  transform skew-x-[10deg]"
                      loading='lazy'
                  />
                </div>
              </div>


              <div className="w-full h-[60%] flex flex-row">
                <div
                  className="w-[15%] h-full flex flex-row justify-center items-center"
                  style={{
                    backgroundImage: isDarkMode ? "url('/splash/left-dark.png')" : "url('/splash/left1.png')",

                    backgroundSize: '100% 100%',
                  }}
                  id="left"
                >
                  <img
                      src={Images[(currentProductIdx - 1 + Images.length) % Images.length]?.variants[0]}
                    alt='leftImg'
                      className="w-[50px]  transform rotate-[-90deg] skew-x-[10deg]"
                      loading='lazy'
                   />
                </div>

                <div
                  className="relative w-[70%] h-full flex flex-row justify-center items-center border border-white-50 "
                  id="center"
                >
                   {/* ----------- handle product spinning tools to shuffle images ---------- */}
                    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden ">
                      <div className="w-full h-full flex items-center justify-center p-1">
                        <img
                          src={Images[currentProductIdx]?.variants[currentVariantIdx]}
                          alt="carousel"
                          className="w-full h-full object-cover transition-transform duration-500 rounded-md"
                          onTouchStart={handleTouchStart}
                          onTouchMove={handleTouchMove}
                          onTouchEnd={handleTouchEnd}
                        />
                      </div>
                    </div>
                    


                    {/* ------- spinning tools section END -------- */}
                    
                    {/* ----------- product description ------- */}
                    {IsShowProductDesc && <ProductDetail isDarkMode={isDarkMode} /> }
                   
                </div>

                <div
                  className="w-[15%] h-full flex flex-row justify-center items-center"
                  style={{
                    backgroundImage: isDarkMode ? "url('/splash/right-dark.png')" : "url('/splash/right1.png')",
                    backgroundSize: '100% 100%',
                  }}
                  id="right"
                >
                  <img
                      src={Images[(currentProductIdx + 1) % Images.length]?.variants[0]}
                    alt="rightImg"
                      className="w-[45px] transform rotate-[90deg] skew-x-[10deg]"
                      loading='lazy'
                  />
                </div>
              </div>

              <div className="w-full h-[15%]  flex flex-row justify-center ">
                <div
                  className="w-[70%] h-full flex flex-row justify-center items-center  "
                  style={{
                    backgroundImage: isDarkMode ? "url('/splash/bottom-dark.png')" : "url('/splash/bottom1.png')",

                    backgroundSize: '100% 100%',
                  }}
                  id="bottom"
                >
                  <img
                    // ref={bottomImageRef}
                      src={Images[currentProductIdx]?.variants[(currentVariantIdx + 2) % Images[currentProductIdx].variants.length]}
                    alt="splash1"
                      className="w-[60px]  transform skew-x-[10deg]"
                      loading='lazy'
                    // onClick={() => swapImages(bottomImageRef)}
                  />
                </div>
                </div>
                
            </div>
          </div>
        </div>
      </div>
      {/* --- Ending the toggle functionality by chaning bg-dark and gray accordingly. */}

        {/* showing product gallery */}
        {IsGallery && <ProductGallery isDarkMode={isDarkMode} setgallery={setGallery} galleryImages={images[currentProductIdx]} />}
        {/* showing features actions */}
        {IsfeaturesMode && <Features isDarkMode={isDarkMode} productImg={images[currentProductIdx][currentVariantIdx]} />}
      </div>     

    </>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
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
function RecommendedProducts({products}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
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
