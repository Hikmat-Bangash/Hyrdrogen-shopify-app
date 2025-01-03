/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {useDispatch, useSelector} from 'react-redux';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {removeFromFavorites} from '~/redux-toolkit/slices/favourite_slice';
import {Link, useNavigate} from '@remix-run/react';
import {toast} from 'react-toastify';
import {
  addToFavoriteProduct,
  handleFeaturePage,
} from '~/redux-toolkit/slices/favoriteProduct';
import {useEffect} from 'react';
export default function FavoritesList() {
  const favorites = useSelector((state) => state?.favourites?.items);
  console.log('favorites.products: ', favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRemoveFromFavorites = (productId) => {
    dispatch(removeFromFavorites(productId));
    toast.success('Product removed successfully!');
  };

  const handleSelectedProduct = (product) => {
    dispatch(addToFavoriteProduct(product));
    navigate('/');
  };

  useEffect(() => {
    dispatch(handleFeaturePage(false));
  }, []);

  return (
    <div className="parent-favourite w-full fixed top-8  ">
      <div className=" flex flex-col px  py-2 gap-3  w-full ">
        <h1 className="text-xl bg-gray-50 py-3 text-center font-normal">
          Your Favorites
        </h1>
        <div className="list px-2">
          {favorites.length > 0 ? (
            <div className="flex flex-col w-full gap-3">
              {favorites.map((product) => (
                <div
                  key={product.id}
                  className="py-2 flex w-full items-center justify-between  border-b border-gray-200"
                >
                  <div
                    className="imge-price  flex items-center gap-5"
                    onClick={() => handleSelectedProduct(product)}
                  >
                    <img
                      src={product?.image}
                      alt="product-img"
                      className="w-14 h-14"
                    />
                    <div className="name-price flex flex-col gap-1">
                      <p>
                        {`${product?.productType} `}
                        <span className="text-sm">{`(${product?.variantTitle})`}</span>
                      </p>
                      <strong>${product?.amount}</strong>
                    </div>
                  </div>

                  <div className="action-btns flex items-center gap-2">
                    <Link
                      to={`/products/${product?.handle}`}
                      className="p-2  font-semibold text-xl cursor-pointer bg-green-500 rounded-sm text-white"
                    >
                      <AiOutlineShoppingCart />
                    </Link>
                    {/* remove product from favourite */}
                    <button
                      className="p-2 text-xl text-white rounded-sm bg-red-400"
                      onClick={() => handleRemoveFromFavorites(product.id)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center mt-32 font-normal text-xl">
              No Favorites Products Found!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
