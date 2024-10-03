import {Suspense} from 'react';
import {defer, redirect} from '@shopify/remix-oxygen';
import {Await, Link, useLoaderData} from '@remix-run/react';
import {
  Image,
  Money,
  VariantSelector,
  getSelectedProductOptions,
  CartForm,
} from '@shopify/hydrogen';
import {getVariantUrl} from '~/lib/variants';
import {PiSpinner} from 'react-icons/pi';

/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.product.title ?? ''}`}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({params, request, context}) {
  const {handle} = params;
  const {storefront} = context;

  const selectedOptions = getSelectedProductOptions(request).filter(
    (option) =>
      !option.name.startsWith('_sid') &&
      !option.name.startsWith('_pos') &&
      !option.name.startsWith('_psq') &&
      !option.name.startsWith('_ss') &&
      !option.name.startsWith('_v') &&
      !option.name.startsWith('fbclid'),
  );

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle, selectedOptions},
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option) => option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  } else if (!product.selectedVariant) {
    throw redirectToFirstVariant({product, request});
  }

  const variants = storefront.query(VARIANTS_QUERY, {variables: {handle}});
  return defer({product, variants});
}

/**
 * @param { { product: ProductFragment; request: Request; } }
 */
function redirectToFirstVariant({product, request}) {
  const url = new URL(request.url);
  const firstVariant = product.variants.nodes[0];

  return redirect(
    getVariantUrl({
      pathname: url.pathname,
      handle: product.handle,
      selectedOptions: firstVariant.selectedOptions,
      searchParams: new URLSearchParams(url.search),
    }),
    {status: 302},
  );
}

export default function Product() {
  const {product, variants} = useLoaderData();
  const {selectedVariant} = product;

  return (
    <div className="w-full flex ml-2 flex-col gap-2 h-auto mt-20">
      {product ? (
        <>
          {/* Product Image */}
          <ProductImage image={selectedVariant?.image} />

          {/* Product Details */}
          <div className="product-details mt-8">
            <ProductMain
              selectedVariant={selectedVariant}
              product={product}
              variants={variants}
            />
          </div>
        </>
      ) : (
        <div className="loading w-screen h-screen flex justify-center items-center text-red-700">
          loading{' '}
        </div>
      )}
    </div>
  );
}

/**
 * @param { { image: ProductVariantFragment['image'] } }
 */
function ProductImage({image}) {
  if (!image) return <div className="product-image" />;

  return (
    <div className="product-image w-44 h-44 object-cover rounded-md">
      <Image
        alt={image.altText || 'Product Image'}
        aspectRatio="1/1"
        data={image}
        key={image.id}
        className="w-full h-full object-cover"
        // sizes="(min-width: 15em) 10vw, 50vw"
      />
    </div>
  );
}

/**
 * @param { { selectedVariant: ProductFragment['selectedVariant']; product: ProductFragment; variants: Promise<ProductVariantsQuery>; } }
 */
function ProductMain({selectedVariant, product, variants}) {
  const {title, descriptionHtml} = product;

  return (
    <div className="product-main ">
      {/* Product Title */}
      <h1 className="text-3xl font-bold">{title}</h1>

      {/* Product Price */}
      <ProductPrice selectedVariant={selectedVariant} />

      {/* Variant Selector and Add to Cart */}
      <Suspense fallback={<p>Loading product details...</p>}>
        <Await resolve={variants} errorElement={<p>Error loading variants.</p>}>
          {(data) => (
            <ProductForm
              product={product}
              selectedVariant={selectedVariant}
              variants={data.product?.variants.nodes || []}
            />
          )}
        </Await>
      </Suspense>

      {/* Product Description */}
      <div className="product-description mt-4">
        <strong>Description:</strong>
        <div dangerouslySetInnerHTML={{__html: descriptionHtml}} />
      </div>
    </div>
  );
}

/**
 * @param { { selectedVariant: ProductFragment['selectedVariant']; } }
 */
function ProductPrice({selectedVariant}) {
  return (
    <div className="product-price mt-4">
      {selectedVariant?.compareAtPrice ? (
        <>
          <p className="text-red-600 font-bold">Sale</p>
          <div className="flex items-center">
            <Money
              data={selectedVariant.price}
              className="text-2xl font-bold"
            />
            <s className="ml-2 text-gray-500">
              <Money data={selectedVariant.compareAtPrice} />
            </s>
          </div>
        </>
      ) : (
        selectedVariant?.price && (
          <Money data={selectedVariant?.price} className="text-2xl font-bold" />
        )
      )}
    </div>
  );
}

/**
 * @param { { product: ProductFragment; selectedVariant: ProductFragment['selectedVariant']; variants: Array<ProductVariantFragment>; } }
 */
function ProductForm({product, selectedVariant, variants}) {
  return (
    <div className="product-form mt-4">
      {/* Variant Selector */}
      <VariantSelector
        handle={product.handle}
        options={product.options}
        variants={variants}
      >
        {({option}) => <ProductOptions key={option.name} option={option} />}
      </VariantSelector>

      {/* Add to Cart Button */}
      <AddToCartButton
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: 1,
                },
              ]
            : []
        }
      >
        {selectedVariant?.availableForSale ? 'Add to Cart' : 'Sold Out'}
      </AddToCartButton>
    </div>
  );
}

/**
 * @param { { option: VariantOption; } }
 */
function ProductOptions({option}) {
  return (
    <div className="product-options mt-2" key={option.name}>
      <h5>{option.name}</h5>
      <div className="grid grid-cols-2 gap-2">
        {option.values.map(({value, isAvailable, isActive, to}) => (
          <Link
            className={`p-2 border ${
              isActive ? 'border-black' : 'border-transparent'
            } ${isAvailable ? '' : 'opacity-50'}`}
            key={option.name + value}
            prefetch="intent"
            preventScrollReset
            replace
            to={to}
          >
            {value}
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * @param { { analytics?: unknown; children: React.ReactNode; disabled?: boolean; lines: CartLineInput[]; onClick?: () => void; } }
 */
function AddToCartButton({children, disabled, lines}) {
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher) => {
        const isLoading = fetcher.state === 'submitting';
        // Check when the cart update is completed, and then redirect
        if (fetcher.state === 'idle' && fetcher.data) {
          // Redirect to the cart page once the product is successfully added
          window.location.href = '/cart';
        }

        return (
          <button
            type="submit"
            disabled={disabled || fetcher.state !== 'idle'}
            className={`mt-4  text-white px-4 py-2 ${
              disabled ? 'opacity-50' : ''
            } ${isLoading ? 'bg-gray-600' : 'bg-black'}`}
          >
            {/* Render spinner while submitting */}
            {isLoading ? (
              <dvi className="text-2xl w-20 text-white flex justify-center items-center animate-spin">
                <PiSpinner />{' '}
              </dvi> // Render the Spinner component
            ) : (
              children // Default "Add to Cart" text or "Sold Out"
            )}
          </button>
        );
      }}
    </CartForm>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    options {
      name
      values
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANTS_FRAGMENT}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@remix-run/react').FetcherWithComponents} FetcherWithComponents */
/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
/** @typedef {import('storefrontapi.generated').ProductVariantsQuery} ProductVariantsQuery */
/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
/** @typedef {import('@shopify/hydrogen').VariantOption} VariantOption */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineInput} CartLineInput */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').SelectedOption} SelectedOption */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
