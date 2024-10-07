/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
// import StartedScreen from '~/components/splash-screen/StartedScreen';
import Homepage from '~/components/HomePage';
import { json } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react/dist/components';

export async function loader({ context }) {
  const { products } = await context.storefront.query(ALL_PRODUCT_QUERY);
  return json({
    allproducts: products.edges
  });
}

// Fetching all products from shopify store

const Index = () => {
  const { allproducts } = useLoaderData();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const formattedProducts = allproducts.map(({ node }) => ({
      id: node.id,
      handle: node.handle,
      title: node.title,
      description: node.descriptionHtml,
      productType: node.productType,
      priceRange: {
        amount: node.priceRange.minVariantPrice.amount,
        currencyCode: node.priceRange.minVariantPrice.currencyCode,
      },
      featuredImage: node.featuredImage?.url || 'placeholder.jpg',
      //  {
      //   url: node.featuredImage?.url || 'placeholder.jpg',
      //   altText: node.featuredImage?.altText || 'No image available',
      // },

      category: node.collections.edges.map((collectionEdge) => collectionEdge.node.title), // Extract collection titles
      images: node.media.edges
        .filter((mediaNode) => mediaNode.node.image) // Filter to only include images
        .map((mediaNode) => mediaNode.node.image.url), // Map to get only the image URL.filter(Boolean), // Filter out any null entries
      variants: node.variants.edges.map((variantNode) => ({
        id: variantNode.node.id,
        title: variantNode.node.title,
        price: {
          amount: variantNode.node.price.amount,
          currencyCode: variantNode.node.price.currencyCode,
        },
        availableForSale: variantNode.node.availableForSale,
      })),
    }));

    setProducts(formattedProducts);
  }, [allproducts])

  // console.log("unstructured product.data: ", allproducts);
  // console.log("structured product.data: ", products)
  // const [IsStartedPage, setIsStartedPage] = useState(false);
  return (
    <>

      {products.length > 0 && <Homepage productsList={products} />}

    </>
  );
};

export default Index;


const ALL_PRODUCT_QUERY = `#graphql
 query getProducts {
  products(first: 50) {
    edges {
      node {
        id
        title
        handle
        descriptionHtml
        media(first: 50) {
          edges {
            node {
              ... on MediaImage {
                image {
                  url
                  altText
                }
              }
            }
          }
        }
        productType
        collections(first: 50) {
          edges {
            node {
              id
              title
            }
          }
        }
        tags
        variants(first: 50) {
          edges {
            node {
              id
              title
              price {
                amount
              }
              compareAtPrice {
                amount
              }
              availableForSale
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
        }
      }
    }
  }
}
`;