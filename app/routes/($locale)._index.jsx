// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-static-element-interactions */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable prettier/prettier */
import { defer } from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
// eslint-disable-next-line no-unused-vars
import {Suspense, useRef, useState} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import CubeScene from '~/components/CubeScene';
import ProductGallery from '~/components/productGallery';
import Features from '~/components/Features';
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
  // eslint-disable-next-line no-unused-vars
  const data = useLoaderData();
  

  const images = [
    'https://images.unsplash.com/photo-1706965048366-75bb371fa357?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1706493684415-375cedfb7454?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1706554597534-52032971bb55?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1706425278305-b9440b5fcd1f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1706554597534-52032971bb55?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1706554597534-52032971bb55?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [IsfeaturesMode, setIsfeaturesMode] = useState(false);
  const [Images, setImages] = useState(images);
  const [centerImageIdx, setCenterImageIdx] = useState(0);
  const [LeftImageIdx, setLeftImageIdx] = useState(1);
  const [RightImageIdx, setRightImageIdx] = useState(2);
  const [TopImageIdx, setTopImageIdx] = useState(3);
  const [BottomImageIdx, setBottomImageIdx] = useState(4);
   
  const [IsGallery, setGallery] = useState(false);
   
  const [IsShowProductDesc, setShowProductDesc] = useState(false);

  // changing light and dark mode func def
  const ThemeMode = () => {
    setIsDarkMode((prev) => !prev)
  }

  // -------- handle features screen ----
  const handleIsFeatures = () => {

    setIsfeaturesMode((prev) => !prev);
  }


  const handleSwipe = (direction) => {
    console.log("handleSwipe is called: ", direction)
    let newIndex = centerImageIdx;

    if (direction === 'left') {
      const centerImg = images[centerImageIdx];
      const leftImg = images[0];
      const rightImg = images[2];

      const newImages = [...Images];
      newImages[0] = rightImg;
      newImages[1] = centerImg;
      newImages[2] = leftImg;

      setImages(newImages);
      setCenterImageIdx(0); // New center image index
      
      // setLeftImageIdx(centerImageIdx);
      // setRightImageIdx(1)
      // setCenterImageIdx(2);
    } else if (direction === 'right') {
      setRightImageIdx(centerImageIdx)
      setLeftImageIdx(2);
      setCenterImageIdx(1);
      
    } else if (direction === 'up') {
      newIndex = 3;
    } else if (direction === 'down') {
      newIndex = 4;
    }

    setCenterImageIdx(newIndex);
  };
  
 
  const handleGalleryScreen = () => {
    setGallery((prev) => !prev)
  }
  
  const showProductDescription = () => {
    setShowProductDesc((prev) => !prev)
  }


  return (
    <>
    
    <div className="w-full h-full absolute ">
      <div className="w-full h-[30%] cursor-pointer ">
        <div className="w-full h-full flex flex-col items-center">
          {/* <Link
        // key={product.id}
        // className="recommended-product"
        to={`/`}
      > */}
          <div className="w-[90%] h-[25%] flex flex-row ">
            {/* <div className="w-[50%] h-full flex flex-row justify-start items-center ">
              <img
                src="/splash/back.png"
                alt="backimage"
                className="w-[14px] h-[11px]"
              />
              <Link
                // key={product.id}
                // className="recommended-product"
                to={`/`}
              >
                <h3
                  className="m-0 p-0 ml-2 font-semibold text-center text-lg leading-5"
                  // onClick={goBack}
                >
                  Back
                </h3>
              </Link>
            </div>

            <div className="w-[50%] h-full  flex flex-row justify-end items-center ">
              <img
                src="/splash/notification.png"
                alt="noti"
                className="w-[19px] h-[20px] right-0 "
              />
            </div> */}
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
                <button
                  className="min-w-[20%] max-w-auto  h-full bg-black text-white text-center rounded-lg p-2 flex flex-row justify-center items-center "
                  style={
                    {
                      // borderRadius: "5px"
                    }
                  }
                >
                  All
                </button>
                <button className="min-w-[20%] max-w-auto h-full bg-black text-white text-center  rounded-lg p-2 flex flex-row justify-center items-center ">
                  Men
                </button>
                <button className="min-w-[20%] max-w-auto h-full bg-black text-white text-center rounded-lg p-2 flex flex-row justify-center items-center ">
                  Women
                </button>
                <button className="min-w-[20%] max-w-auto h-full bg-black text-white text-center rounded-lg p-2 flex flex-row justify-center items-center ">
                  Kid&apos;s
                </button>
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
                    src={Images[TopImageIdx]}
                    alt="topImg"
                      className="w-[70px] h-[40px] transform skew-x-[10deg]"
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
                    src={Images[LeftImageIdx]}
                    alt='leftImg'
                      className="w-[100px] h-[65px] transform rotate-[-90deg] skew-x-[10deg]"
                      loading='lazy'
                   />
                </div>

                <div
                  className="relative w-[70%] h-full flex flex-row justify-center items-center "
                  id="center"
                >
                    <CubeScene isDarkMode={isDarkMode} onSwipe={handleSwipe} centerImage={Images[centerImageIdx]} Images={Images} />
                    
                    {/* ----------- product description ------- */}
                    {IsShowProductDesc && (
                      <div className={`contianer w-full h-full absolute z-40 top-0  backdrop-blur-sm   justify-center items-center ${isDarkMode ? "bg-black/60" : "bg-[#FFFFFFBF]"} rounded-md `}>

                        <div className="wrapper overflow-hidden relative w-full h-full flex flex-col gap-[1rem]  rounded-[0.93rem] p-3  overflow-y-scroll">
                          {/* heading and sub-heading */}
                          <div className="heading-sub-heading  flex flex-col gap-2">
                            <p className={`font-bold text-[10px] leading-[14px] ${isDarkMode ? "text-[#D9D9D9]" : "text-black"} `}>Low stock - 10 items left</p>

                            <p className={`font-bold text-[16px] leading-[24px] tracking-[0.5px] ${isDarkMode ? "text-[#D9D9D9]" : "text-black"}`}>Digital Fitness Watch</p>

                          <p className='font-bold text-[16px] leading-[24px] text-[#DAAF37]'>$150</p>
                          </div>

                          {/* --- description ------- */}
                          <p className={`text-[12px] leading-[18px] ${isDarkMode ? "text-white" : "text-black"} `}>From built-in GPS tracking to advanced heart rate monitoring, this fitness watch has everything you need to keep yourself motivated and in shape</p>
                          {/* icons + names */}
                          <div className="icons-names w-full flex justify-between">
                            {/* icon1 */}
                            <div className="icon1 flex flex-col gap-2 justify-center items-center">
                              <img src="/splash/icon1.png" alt="icon1" className=''/>
                              <p className={`text-[10px] leading-[14px]  ${isDarkMode ? "text-white" : "text-black"} `}>Water Resistant</p>
                            </div>
                            {/* icon2 */}
                            <div className="icon1 flex flex-col gap-2 justify-center items-center">
                              <img src="/splash/icon2.png" alt="icon1" className='' />
                              <p className={`text-[10px] leading-[14px]  ${isDarkMode ? "text-white" : "text-black"} `}>Crystal Glass</p>
                            </div>
                            {/* icon3 */}
                            <div className="icon1 flex flex-col gap-2 justify-center items-center">
                              <img src="/splash/icon3.png" alt="icon1" className='' />
                              <p className={`text-[10px] leading-[14px]  ${isDarkMode ? "text-white" : "text-black"} `}>124 Gram</p>
                            </div>
                          </div>
                        </div>                

                      </div>
                    )}
                   
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
                    src={Images[RightImageIdx]}
                    alt="rightImg"
                      className="w-[70px] h-[40px] transform rotate-[90deg] skew-x-[10deg]"
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
                    src={Images[BottomImageIdx]}
                    alt="splash1"
                      className="w-[70px] h-[40px] transform skew-x-[10deg]"
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


      {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalImage && (
          <img
            alt={modalImage.altText || 'Modal Image'}
            src={modalImage.url}
            className="h-[200px] w-[200px]"
          />
        )}
      </Modal> */}
      </div>
      
      {/* showing product gallery */}
      {IsGallery && <ProductGallery isDarkMode={isDarkMode} setgallery={setGallery} />}
      {/* showing features actions */}
      {IsfeaturesMode && <Features isDarkMode={isDarkMode}/>}

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
