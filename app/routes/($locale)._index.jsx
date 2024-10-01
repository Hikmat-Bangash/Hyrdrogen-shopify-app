/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import Homepage from '~/components';
// import StartedScreen from '~/components/splash-screen/StartedScreen';
import HomepageCopy from '~/components/HomePageCopy';
import { json } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react/dist/components';

export async function loader({ context }) {
  const { products } = await context.storefront.query(ALL_PRODUCT_QUERY);
  // console.log('fetched products: ', products.edges);
  return json({
    allproducts: products.edges
  });
}

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
  
  console.log("unstructured product.data: ", allproducts);
  console.log("structured product.data: ", products)
  const [IsStartedPage, setIsStartedPage] = useState(false);
  return (
    <>
      {IsStartedPage ? (
        <> 
          {/* <StartedScreen setIsStartedPage={setIsStartedPage} /> */}
          <div className='w-full flex flex-col gap-3 justify-center items-center mt-14'>
            <h1>Product List</h1>
            <div className="w-full flex flex-col gap-3 p-4 ">
              {products?.map(( node ) => (
                <div key={node.id} className="w-full flex gap-3 border border-red-500">
                  <img
                    src={node.featuredImage ? node.featuredImage : 'placeholder.jpg'}
                    alt={'Product Image'}
                    className="product-image w-24 h-24 object-cover"
                  />
                  <div className="wrapper flex flex-col gap-2">
                  <h2>{node.title}</h2>
                  <p dangerouslySetInnerHTML={{ __html: node.descriptionHtml }} />
                  <p>
                    Price: {node?.priceRange?.amount} {node.priceRange.currencyCode}
                    </p>
                    

                    <h3>Media:</h3>
                    <div className="media-gallery flex gap-4">
                      {node.images.map((mediaNode , index) => (
                        <div key={index}>
                         
                            <img
                              src={mediaNode}
                              alt={'Media Image'}
                              className="media-image w-10 h-10"
                            />
                
                          {/* {mediaNode.sources && (
                            <video controls className="media-video">
                              <source src={mediaNode.sources[0].url} type={mediaNode.sources[0].mimeType} />
                              Your browser does not support the video tag.
                            </video>
                          )} */}
                        </div>
                      ))}
                    </div>

                    <h3>Variants:</h3>
                    {/* {variants.map(({ node: variant }) => (
                      <div key={variant.id} className="variant-card">
                        <p>Variant Title: {variant.title}</p>
                        <p>
                          Price: {variant.price.amount} {variant.price.currencyCode}
                        </p>
                        <p>{variant.availableForSale ? 'Available' : 'Out of Stock'}</p>
                      </div>
                    ))} */}
                    

                    <a href={`/products/${node.handle}`}>View Product</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          </>
      ) : (<>
          {products.length > 0 && <HomepageCopy productsList={products} />}
      </>
      )}
    </>
  );
};

export default Index;


const ALL_PRODUCT_QUERY = `#graphql
 query getProducts {
  products(first: 20) {
    edges {
      node {
        id
        title
        handle
        descriptionHtml
        media(first: 10) {
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
        collections(first: 10) {
          edges {
            node {
              id
              title
            }
          }
        }
        tags
        variants(first: 10) {
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