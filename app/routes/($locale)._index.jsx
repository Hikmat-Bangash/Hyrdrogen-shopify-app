/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import Homepage from '~/components/HomePage';
import { json } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react/dist/components';

export async function loader({ context }) {
  const { products, collections } = await context.storefront.query(PRODUCTS_AND_COLLECTIONS_QUERY);
  return json({
    allProducts: products.edges,
    allCollections: collections.edges,
  });
}

// Fetching all products and collections from the Shopify store
const Index = () => {
  const { allProducts, allCollections } = useLoaderData();
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    // Function to structure each product consistently
    const formatProduct = (productNode) => ({
      id: productNode.id,
      handle: productNode.handle,
      title: productNode.title,
      description: productNode.descriptionHtml,
      productType: productNode.productType,
      priceRange: {
        amount: productNode.priceRange.minVariantPrice.amount,
        currencyCode: productNode.priceRange.minVariantPrice.currencyCode,
      },
      featuredImage: productNode.featuredImage?.url || 'placeholder.jpg',
      tags: productNode.tags, // Include tags
      category: productNode.collections.edges.map((collectionEdge) => collectionEdge.node.title),
      images: productNode.media.edges
        .filter((mediaNode) => mediaNode.node.image)
        .map((mediaNode) => mediaNode.node.image.url),
      variants: productNode.variants.edges.map((variantNode) => ({
        id: variantNode.node.id,
        title: variantNode.node.title,
        price: {
          amount: variantNode.node.price.amount,
          currencyCode: variantNode.node.price.currencyCode,
        },
        availableForSale: variantNode.node.availableForSale,
      })),
    });

    // Format the products data (standalone products)
    const formattedProducts = allProducts.map(({ node }) => formatProduct(node));

    // Format the collections data and include full product details in the same structure as standalone products
    const formattedCollections = allCollections.map(({ node }) => ({
      id: node.id,
      title: node.title,
      handle: node.handle,
      description: node.description, // Collection description
      image: node.image?.url || 'placeholder.jpg', // Collection image
      products: node.products.edges.map((productEdge) => formatProduct(productEdge.node)), // Apply the same product structure
    }));

    setProducts(formattedProducts);
    setCollections(formattedCollections);
  }, [allProducts, allCollections]);

  // console.log("unstructured product data: ", allProducts);
  // console.log("unstructured collections data: ", allCollections);
  // console.log("structured collections data: ", collections);
  // console.log("structured product data: ", products);

  return (
    <>
      {products.length > 0 && <Homepage productsList={products} collectionsData = {collections} />}
    </>
  );
};

export default Index;

const PRODUCTS_AND_COLLECTIONS_QUERY = `#graphql
 query getProductsAndCollections {
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
  collections(first: 50) {
    edges {
      node {
        id
        title
        handle
        description
        image {
          url
          altText
        }
        products(first: 50) {
          edges {
            node {
              id
              title
              handle
              descriptionHtml
              productType
              tags
              featuredImage {
                url
                altText
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
              collections(first: 50) {
                edges {
                  node {
                    id
                    title
                  }
                }
              }
              variants(first: 50) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    availableForSale
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
