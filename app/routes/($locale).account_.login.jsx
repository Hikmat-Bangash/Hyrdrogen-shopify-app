/**
 * @param {LoaderFunctionArgs}
 */

export async function loader({request, context}) {
  return context.customerAccount.login();
}

export async function login() {
  return <>{/* <Login/> */}</>;
}

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */