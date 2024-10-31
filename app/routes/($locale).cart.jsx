import {Await} from '@remix-run/react';
import {Suspense} from 'react';
import {CartForm} from '@shopify/hydrogen';
import {json} from '@shopify/remix-oxygen';
import {CartMain} from '~/components/Cart';
import {useRootLoaderData} from '~/root';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: `Hydrogen | Cart`}];
};

/**
 * @param {ActionFunctionArgs}
 */
export async function action({request, context}) {
  const {cart} = context;
  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);

  if (!action) {
    throw new Error('No action provided');
  }

  let result;
  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    default:
      throw new Error(`${action} cart action is not defined`);
  }

  const cartId = result.cart.id;
  const headers = cart.setCartId(cartId);
  const {cart: cartResult, errors} = result;

  const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string') {
    headers.set('Location', redirectTo);
  }

  headers.append('Set-Cookie', await context.session.commit());

  return json(
    {
      cart: cartResult,
      errors,
      analytics: {
        cartId,
      },
    },
    {headers},
  );
}

export default function Cart() {
  const rootData = useRootLoaderData(); // Fetching root loader data
  const cartPromise = rootData?.cart; // The cart promise from the loader

  // Log the cart data to ensure it's present
  console.log('Cart page loaded, cart data: ', rootData?.cart);

  return (
    <div className="cart mt-[3rem] h-screen">
      <div className="cartpage mt-15 py-5 border-b border-gray-300 flex justify-center items-center bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-800">
          Your Cart Products
        </h1>
      </div>
      <Suspense fallback={<p>Loading cart...</p>}>
        <Await
          resolve={cartPromise} // Await the cart promise
          errorElement={<div>An error occurred</div>}
        >
          {(cart) => {
            // If no cart or the cart is empty
            if (!cart || cart.lines.length === 0) {
              return (
                <div className="flex justify-center items-center h-full">
                  <p>Your cart is empty</p>
                </div>
              );
            }

            // Render the cart with CartMain
            return <CartMain layout="page" cart={cart} />;
          }}
        </Await>
      </Suspense>
    </div>
  );
}
