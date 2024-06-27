// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable prettier/prettier */
import { defer } from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense, useRef, useState} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import CubeScene from '~/components/CubeScene';

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
  const data = useLoaderData();
  const centerImageRef = useRef();
  const leftImageRef = useRef();
  const rightImageRef = useRef();
  const topImageRef = useRef();
  const bottomImageRef = useRef();

  const [leftImageSrc, setLeftImageSrc] = useState(
    'https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  );

  return (
    // <div className="home">
    //   <FeaturedCollection collection={data.featuredCollection} />
    //   <RecommendedProducts products={data.recommendedProducts} />
    // </div>

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
                Kelly&aposs Kapsule
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
              <div className="w-full h-[20%]  flex flex-row justify-around absolute mt-[15px]">
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
                  Kid&aposs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[63%] bg-backgroundColortool ">
        <div className="w-full h-[10%] flex flex-row ">
          <div className="w-[50%] h-full flex flex-row p-2 gap-3 ">
            <img src="/splash/rect1.png" alt="rect1" className="ml-3" />
            <img src="/splash/rect2.png" alt="rect1" />
            <img src="/splash/rect3.png" alt="rect1" />
          </div>
          <div className="w-[40%] h-full  flex flex-row justify-end items-center  ">
            <input
              type="checkbox"
              className="toggle toggle-md text-white border-white"
              readOnly
            />
          </div>
        </div>
        <div className="w-full h-full flex flex-col justify-center items-center relative">
          <div className="w-full h-[90%]">
            {/* <div className="w-full h-full absolute">
          <CubeScene image={image} />
        </div> */}
            <div className="w-full h-full flex flex-col ">
              <div className="w-full h-[15%] flex flex-row justify-center ">
                <div
                  className="w-[70%] h-full flex flex-row justify-center items-center "
                  style={{
                    backgroundImage: "url('/splash/top1.png')",
                    backgroundSize: '100% 100%',
                  }}
                  id="top"
                >
                  <img
                    // ref={topImageRef}
                    // src={image.url}
                    src={leftImageSrc}
                    alt={leftImageSrc}
                    className="w-[40px] h-[40px]"
                  />
                </div>
              </div>
              <div className="w-full h-[60%] flex flex-row">
                <div
                  className="w-[15%] h-full flex flex-row justify-center items-center"
                  style={{
                    backgroundImage: `url('/splash/left1.png')`,
                    backgroundSize: '100% 100%',
                  }}
                  id="left"
                >
                  <img
                    ref={leftImageRef}
                    src={leftImageSrc}
                    alt={leftImageSrc}
                    className="w-[40px] h-[40px]"
                    // onClick={() => swapImages(leftImageRef)}
                  />
                </div>

                <div
                  className="w-[70%] h-full flex flex-row justify-center items-center  "
                  id="center"
                >
                  <CubeScene />
                </div>

                <div
                  className="w-[15%] h-full flex flex-row justify-center items-center"
                  style={{
                    backgroundImage: `url('/splash/right1.png')`,
                    backgroundSize: '100% 100%',
                  }}
                  id="right"
                >
                  <img
                    src="https://plus.unsplash.com/premium_photo-1682513184135-b7b9b76fb4eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="splash3"
                    className="w-[40px] h-[40px]"
                  />
                </div>
              </div>

              <div className="w-full h-[15%]  flex flex-row justify-center ">
                <div
                  className="w-[70%] h-full flex flex-row justify-center items-center  "
                  style={{
                    backgroundImage: "url('/splash/bottom1.png')",
                    backgroundSize: '100% 100%',
                  }}
                  id="bottom"
                >
                  <img
                    ref={bottomImageRef}
                    src="https://images.unsplash.com/photo-1633621412960-6df85eff8c85?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="splash1"
                    className="w-[40px] h-[40px]"
                    // onClick={() => swapImages(bottomImageRef)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
