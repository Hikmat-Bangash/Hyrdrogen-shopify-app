/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import Homepage from '~/components/HomePage';
import HomepageCopy from '~/components/homePage.copy';
import { json } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react/dist/components';

export async function loader({ context }) {
  const result = await context.storefront.query(PRODUCTS_AND_COLLECTIONS_QUERY);
  const { products, collections } = result || {};

  return json({
    allProducts: products?.edges || [],
    allCollections: collections?.edges || [],
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
      description: productNode.descriptionHtml.replace(/<\/?[^>]+(>|$)/g, ""),
      productType: productNode.productType,
      priceRange: {
        amount: productNode.priceRange.minVariantPrice.amount,
        currencyCode: productNode.priceRange.minVariantPrice.currencyCode,
      },
      featuredImage: productNode.featuredImage?.url || 'placeholder.jpg',
      tags: productNode.tags,
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
        compareAtPrice: variantNode.node.compareAtPrice
          ? {
            amount: variantNode.node.compareAtPrice.amount,
            currencyCode: variantNode.node.compareAtPrice.currencyCode,
          }
          : null,
        availableForSale: variantNode.node.availableForSale,
        sku: variantNode.node.sku,
        weight: variantNode.node.weight,
        weightUnit: variantNode.node.weightUnit,
        barcode: variantNode.node.barcode,
        image: variantNode.node.image
          ? {
            url: variantNode.node.image.url,
            altText: variantNode.node.image.altText,
          }
          : null,
        selectedOptions: variantNode.node.selectedOptions.map((option) => ({
          name: option.name,
          value: option.value,
        })),
      })),
    });

    // Format the products data (standalone products)
    const formattedProducts = allProducts.map(({ node }) => formatProduct(node));

    // Format the collections data and include full product details in the same structure as standalone products
    const formattedCollections = allCollections.map(({ node }) => ({
      id: node.id,
      title: node.title,
      handle: node.handle,
      description: node.description,
      image: node.image?.url || 'placeholder.jpg',
      products: node.products.edges.map((productEdge) => formatProduct(productEdge.node)),
    }));

    setProducts(formattedProducts);
    setCollections(formattedCollections); 
  }, [allProducts, allCollections]);


  // console.log("product data: ", allProducts);
  // console.log("collections data: ", allCollections);


  // console.log("structured product data: ", products);
  // console.log("structured collections data: ", collections);  
  

  return (
    <>
      {products.length > 0 && <Homepage productsList={products} collectionsData={collections} />}
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
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              availableForSale
              sku                          # SKU (Stock Keeping Unit)
              weight                       # Variant weight
              weightUnit                   # Weight unit for the variant
              barcode                      # Barcode of the variant
              image {
                url                        # URL of the variant image
                altText                    # Alt text for the variant image
              }
              selectedOptions {            # Selected options for the variant (like size, color)
                name
                value
              }
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
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    availableForSale
                    sku
                    weight
                    weightUnit
                    barcode
                    image {
                      url
                      altText
                    }
                    selectedOptions {
                      name
                      value
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
}
`;
