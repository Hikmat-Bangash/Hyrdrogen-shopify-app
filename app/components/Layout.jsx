import {Await} from '@remix-run/react';
import {Suspense} from 'react';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {CartMain} from '~/components/Cart';
import {Link} from '@remix-run/react';

import {
  PredictiveSearchForm,
  PredictiveSearchResults,
} from '~/components/Search';

/**
 * @param {LayoutProps}
 */
export function Layout({cart, children = null, footer, header, isLoggedIn}) {
  return (
    <>
      {/* <CartAside cart={cart} />
    <SearchAside />
    <MobileMenuAside menu={header?.menu} shop={header?.shop} /> */}
      <div className="w-screen h-screen relative  ">
        <div className="w-full h-full   absolute   ">
          <div className="w-full h-[6%] bg-yellow-100 flex flex-row items-start justify-center z-20 ">
            <div className="w-[90%] h-[6%] flex flex-row fixed top-0   ">
              <div className="w-[50%] h-full flex flex-row justify-start items-center ">
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
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full max-h-auto relative ">
          <main>{children}</main>
        </div>

        <div className=" w-full  bottom-0 fixed ">
          {header && (
            <Header header={header} cart={cart} isLoggedIn={isLoggedIn} />
          )}
        </div>
      </div>
      {/* <main>{children}</main> */}
      {/* <Suspense>
      <Await resolve={footer}>
        {(footer) => <Footer menu={footer?.menu} shop={header?.shop} />}
      </Await>
    </Suspense> */}
    </>
  );
}

/**
 * @param {{cart: LayoutProps['cart']}}
 */
function CartAside({cart}) {
  return (
    <Aside id="cart-aside" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  return (
    <Aside id="search-aside" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <PredictiveSearchForm>
          {({fetchResults, inputRef}) => (
            <div>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
              />
              &nbsp;
              <button
                onClick={() => {
                  window.location.href = inputRef?.current?.value
                    ? `/search?q=${inputRef.current.value}`
                    : `/search`;
                }}
              >
                Search
              </button>
            </div>
          )}
        </PredictiveSearchForm>
        <PredictiveSearchResults />
      </div>
    </Aside>
  );
}

/**
 * @param {{
 *   menu: HeaderQuery['menu'];
 *   shop: HeaderQuery['shop'];
 * }}
 */
function MobileMenuAside({menu, shop}) {
  return (
    menu &&
    shop?.primaryDomain?.url && (
      <Aside id="mobile-menu-aside" heading="MENU">
        <HeaderMenu
          menu={menu}
          viewport="mobile"
          primaryDomainUrl={shop.primaryDomain.url}
        />
      </Aside>
    )
  );
}

/**
 * @typedef {{
 *   cart: Promise<CartApiQueryFragment | null>;
 *   children?: React.ReactNode;
 *   footer: Promise<FooterQuery>;
 *   header: HeaderQuery;
 *   isLoggedIn: Promise<boolean>;
 * }} LayoutProps
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
