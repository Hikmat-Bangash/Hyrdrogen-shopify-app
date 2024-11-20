import React from 'react';
// import {AccountLoginForm} from '~/components/account';
/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({params, context}) {
  const {language, country} = context.storefront.i18n;
  console.log(language, country);

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the locale URL param is defined, yet we still are still at the default locale
    // then the the locale param must be invalid, send to the 404 page
    throw new Response(null, {status: 404});
  }

  return null;
}

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */

const login = () => {
  return (
    <>
      <div className='mt-10 font-bold text-red-700'>login Cting </div>
      {/* <AccountLoginForm /> */}
    </>
  );
};

export default login;
