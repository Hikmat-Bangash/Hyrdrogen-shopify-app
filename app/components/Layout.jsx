/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line no-unused-vars
import {Await, Link, useLocation, useNavigate} from '@remix-run/react';
import {Suspense, useState} from 'react';
import {Aside} from '~/components/Aside';
// eslint-disable-next-line no-unused-vars
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {CartMain} from '~/components/Cart';
import {
  PredictiveSearchForm,
  PredictiveSearchResults,
} from '~/components/Search';
import {
  filteredMenuToggle,
  handleFeaturePage,
} from '~/redux-toolkit/slices/favoriteProduct';
import {useDispatch} from 'react-redux';
import {CiFilter} from 'react-icons/ci';
import {BsChevronDown} from 'react-icons/bs';

/**
 * @param {LayoutProps}
 */
export function Layout({cart, children = null, footer, header, isLoggedIn}) {
  // Get the current location object
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the current path is the root ("/") or not
  const isHomePage = location.pathname === '/';
  const isCartPage = location.pathname === '/cart';

  const handleBackButtonClick = () => {
    dispatch(handleFeaturePage(false));
    if (isCartPage) {
      navigate('/');
    } else {
      window.history.back();
    }
  };

  const filteredToggleButton = () => {
    dispatch(filteredMenuToggle());
  };

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default selection

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setDropdownVisible(false); // Close the dropdown after selection
    console.log(`Selected category: ${category}`); // Add any additional logic here
    dispatch(filteredMenuToggle(category));
  };

  return (
    <>
      <div className="w-screen h-screen relative  ">
        <div className="w-full bg-yellow-50 h-[6%]  fixed top-0 z-40   ">
          <div className="w-full h-[6%]   flex flex-row items-start justify-center z-20 ">
            <div className="w-[98%] h-[6%]  flex flex-row justify-between items-center fixed top-0   ">
              <div
                className="w-[25%] h-full flex flex-row justify-start items-center "
                onClick={handleBackButtonClick}
              >
                {!isHomePage && (
                  <>
                    <img
                      src="/splash/back.png"
                      alt="backimage"
                      className="w-[14px] h-[11px]"
                    />
                    <h3 className="m-0 p-0 ml-2 font-semibold text-center text-lg leading-5">
                      Back
                    </h3>
                  </>
                )}
              </div>

              <div className="title w-[50%] flex justify-center items-center">
                <h1
                  className="text-[#DAAF37] font-avenir"
                  style={{
                    fontSize: '18px',
                    fontWeight: '50',
                    letterSpacing: '0em',
                  }}
                >
                  Kelly&apos;s Kapsule
                </h1>
              </div>

              <div className="w-[25%] h-full flex flex-row justify-end items-center relative">
                {/* Dropdown Button */}
                <button
                  className="flex items-center justify-between text-gray-700 bg-white px-2 py-1 text-xs border border-gray-300 rounded-md hover:bg-gray-100"
                  onClick={toggleDropdown}
                >
                  {selectedCategory} <BsChevronDown className="ml-2 mt-1" />
                </button>

                {/* Dropdown Menu */}
                {dropdownVisible && (
                  <div className="absolute right-0 text-xs mt-40 w-24 bg-white border border-gray-300 rounded-md overflow-hidden shadow-lg z-50">
                    <ul className="flex flex-col">
                      {['All', 'Men', 'Women', 'Kids'].map((category) => (
                        <li
                          key={category}
                          className={`px-4 py-1 cursor-pointer ${
                            selectedCategory === category
                              ? 'bg-gray-100 font-bold'
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={() => handleSelectCategory(category)}
                        >
                          {category}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full max-h-auto relative ">
          <main>{children}</main>
        </div>

        <div className=" w-full  bottom-0 fixed z-50">
          {header && (
            <Header header={header} cart={cart} isLoggedIn={isLoggedIn} />
          )}
        </div>
      </div>
    </>
  );
}

/**
 * @param {{cart: LayoutProps['cart']}}
 */
// eslint-disable-next-line no-unused-vars
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

// eslint-disable-next-line no-unused-vars
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
// eslint-disable-next-line no-unused-vars
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
