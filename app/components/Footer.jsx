/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {NavLink} from '@remix-run/react';
import {useRootLoaderData} from '~/root';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {useHistory} from '@shopify/hydrogen';

/**
 * @param {FooterQuery & {shop: HeaderQuery['shop']}}
 */
export function Footer({menu, shop}) {
  // const history = useHistory();
  const goBack = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    window.history.back(); // Navigates back one step in the browser's history
  };
  return (
    <footer className="w-screen h-[270px] fixed top-0 right-0  bg-yellow-50">
      {/* {menu && shop?.primaryDomain?.url && (
        <FooterMenu menu={menu} primaryDomainUrl={shop.primaryDomain.url} />
      )} */}
      <div className="w-full h-full cursor-pointer  ">
        <div className="w-full h-full flex flex-col items-center">
          {/* <Link
            // key={product.id}
            // className="recommended-product"
            to={`/`}
          > */}
          <div className="w-[90%] h-[25%] flex flex-row ">
            <div className="w-[50%] h-full flex flex-row justify-start items-center ">
              <img
                src="/splash/back.png"
                alt="backimage"
                className="w-[14px] h-[11px]"
              />

              <h3
                className="m-0 p-0 ml-2 font-semibold text-center text-lg leading-5"
                onClick={goBack}
              >
                Back
              </h3>
            </div>

            <div className="w-[50%] h-full  flex flex-row justify-end items-center ">
              <img
                src="/splash/notification.png"
                alt="noti"
                className="w-[19px] h-[20px] right-0 "
              />
            </div>
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
                  Kid&apos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * @param {{
 *   menu: FooterQuery['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 * }}
 */
function FooterMenu({menu, primaryDomainUrl}) {
  const {publicStoreDomain} = useRootLoaderData();

  return (
    <nav className="footer-menu" role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
