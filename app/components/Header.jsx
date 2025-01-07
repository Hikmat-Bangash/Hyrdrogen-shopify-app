import {Await, NavLink} from '@remix-run/react';
import {Suspense} from 'react';
import {useRootLoaderData} from '~/root';
import {GoBookmark} from 'react-icons/go';
import {CgProfile} from 'react-icons/cg';
import {IoCartOutline} from 'react-icons/io5';
import {AiOutlineHome} from 'react-icons/ai';
import {useDispatch, useSelector} from 'react-redux';
import {
  handleFeaturePage,
  removeFromFavoriteProduct,
} from '~/redux-toolkit/slices/favoriteProduct';

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart}) {
  // const {shop, menu} = header;
  const favoriteProduct = useSelector((state) => state?.favoriteProduct?.items);
  const favorites = useSelector((state) => state?.favourites?.items);
  const totalCartProducts = useSelector(
    (state) => state?.favoriteProduct?.totalCartProducts,
  );

  const dispatch = useDispatch();

  const handleHomebtnClick = () => {
    dispatch(handleFeaturePage(false));
    if (favoriteProduct?.length > 0) {
      dispatch(removeFromFavoriteProduct());
    }
  };

  return (
    <header className="w-screen h-[70px] fixed bottom-0 right-0 z-50 ">
      {/* <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
        <strong>{shop.name}</strong>
      </NavLink>
      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
      />
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} /> */}

      <div className="w-full h-full bg-buttonlogin cursor-pointer ">
        <div className="w-full h-full flex flex-row  justify-around items-center ">
          <div className="w-[13%] h-[80%]  ">
            <NavLink
              to="/"
              onClick={handleHomebtnClick}
              className=" w-full h-full flex flex-col justify-center items-center p-2"
            >
              <div className="icon text-xl text-white">
                <AiOutlineHome />
              </div>
              <h3>Home</h3>
            </NavLink>
          </div>

          <div className="w-[13%] h-[80%] ">
            <NavLink
              to="/cart"
              className="relative w-full h-full flex flex-col justify-center items-center p-2"
            >
              <div className="icon text-xl text-white">
                <IoCartOutline />
              </div>
              <h3 className="text-white">Cart</h3>

              {/* badge */}
              {totalCartProducts > 0 && (
                <div className="badge absolute top-0 right-0 w-4 h-4 font-semibold rounded-full bg-red-500 flex justify-center items-center text-[10px] text-white">
                  {totalCartProducts}
                </div>
              )}
            </NavLink>
          </div>
          <div className="w-[13%] h-[80%]  ">
            <NavLink
              to="/myprofile"
              className=" w-full h-full flex flex-col justify-center items-center p-2"
            >
              <div className="icon text-xl text-white">
                <CgProfile />
              </div>
              <h3 className="text-white">Profile</h3>
            </NavLink>
          </div>
          <div className="w-[13%] h-[80%]">
            <NavLink
              to="/favourite"
              className="relative w-full h-full flex flex-col justify-center items-center p-2"
            >
              <div className="  icon text-xl text-white">
                <GoBookmark />
              </div>
              <h3 className="text-white">Favorite</h3>
              {/* badge */}
              {favorites?.length > 0 && (
                <div className="badge absolute top-0 right-0 w-4 h-4 font-semibold rounded-full bg-red-500 flex justify-center items-center text-[10px] text-white">
                  {favorites?.length}
                </div>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 * }}
 */
export function HeaderMenu({menu, primaryDomainUrl, viewport}) {
  const {publicStoreDomain} = useRootLoaderData();
  const className = `header-menu-${viewport}`;

  function closeAside(event) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={closeAside}
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

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({isLoggedIn, cart}) {
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/login" style={activeLinkStyle}>
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  return (
    <a className="header-menu-mobile-toggle" href="#mobile-menu-aside">
      <h3>☰</h3>
    </a>
  );
}

function SearchToggle() {
  return <a href="#search-aside">Search</a>;
}

/**
 * @param {{count: number}}
 */
function CartBadge({count}) {
  // return <a href="#cart-aside">Cart {count}</a>;
  return <a href="#cart-aside">Cart </a>;
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;

          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
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
    color: isPending ? 'grey' : 'black',
  };
}

/** @typedef {Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>} HeaderProps */
/** @typedef {'desktop' | 'mobile'} Viewport */

/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('./Layout').LayoutProps} LayoutProps */
