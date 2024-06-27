import React from 'react';

const CreateProduct = (props) => {
  const {handleDeleteProduct, index} = props;
  console.log(index);
  const handleDelete = () => {
    handleDeleteProduct(index);
  };
  return (
    <div className="w-full h-[710px]  bg-slate-200 " id="categorysnippet">
      <div className="w-full h-full flex flex-col items-start ">
        <div className="w-full h-[282px] flex flex-row justify-center">
          <div className="w-[90%] h-full  ">
            <div className="w-full h-10  mt-4 flex flex-row">
              <div className="w-1/2 h-full flex flex-row justify-start items-center  ">
                <h3
                  className=""
                  style={{
                    fontFamily: 'Source Sans Pro',
                    fontSize: '16px',
                    fontWeight: '600',
                    lineHeight: '20px',
                    textAlign: 'center',
                  }}
                >
                  Category1
                </h3>
              </div>
              <div className="w-1/2 h-full  flex flex-row justify-end items-center  ">
                <img
                  src="splash/delicon.png"
                  alt="delicon"
                  className=""
                  onClick={handleDelete}
                />
              </div>
            </div>
            <div className=" w-full h-auto flex flex-col  ">
              <label
                className="p-1"
                style={{
                  fontFamily: 'Source Sans Pro',
                  fontSize: '14px',
                  fontWeight: '400',
                  lineHeight: '20px',
                }}
              >
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                placeholder="Enter product name"
                id="productName"
                className="p-2 bg-slate-200 border border-slate-400 border-r-2"
              />
            </div>
            <div className=" w-full h-auto flex flex-col  ">
              <label
                className="p-1"
                style={{
                  fontFamily: 'Source Sans Pro',
                  fontSize: '14px',
                  fontWeight: '400',
                  lineHeight: '20px',
                }}
              >
                Price
              </label>
              <input
                type="text"
                name="productPrice"
                placeholder="Enter Price"
                id="productPrice"
                className="p-2 bg-slate-200 border border-slate-400 border-r-2"
              />
            </div>
            <div className=" w-full h-[100px] flex flex-col   ">
              <label
                className="p-1"
                style={{
                  fontFamily: 'Source Sans Pro',
                  fontSize: '14px',
                  fontWeight: '400',
                  lineHeight: '20px',
                }}
              >
                Description
              </label>
              <input
                type="text"
                name="preductDescription"
                placeholder="Enter Description of Product"
                id="productDescription"
                className="p-2 w-full h-full bg-slate-200 border border-slate-400 border-r-2"
              />
            </div>
            <label
              style={{
                fontFamily: 'Source Sans Pro',
                fontSize: '14px',
                fontWeight: '400',
                lineHeight: '20px',
                // textAlign: center;
              }}
              className="p-1"
            >
              Upload
            </label>
            <div className="w-full h-[116px] flex flex-col items-center justify-center border border-black border-dotted pb-4">
              <img
                src="splash/download-icon.png"
                alt="dlicon"
                className="w-10 h-10"
              />
              <h3
                className="p-2"
                style={{
                  fontFamily: 'Source Sans Pro',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: '20px',
                  // textAlign: center;
                }}
              >
                {' '}
                This will be the Category photo.
              </h3>
            </div>
            <div className=" w-full h-auto flex flex-col  ">
              <label
                className="p-1"
                style={{
                  fontFamily: 'Source Sans Pro',
                  fontSize: '14px',
                  fontWeight: '400',
                  lineHeight: '20px',
                }}
              >
                Product Page Url
              </label>
              <input
                type="text"
                name="productPageUrl"
                placeholder="Enter Product Page Url"
                id="productPageUrl"
                className="p-2 bg-slate-200 border border-slate-400 border-r-2"
              />
            </div>
            <div className=" w-full h-[200px] flex flex-col  ">
              <label
                className="p-1"
                style={{
                  fontFamily: 'Source Sans Pro',
                  fontSize: '14px',
                  fontWeight: '400',
                  lineHeight: '20px',
                }}
              >
                Product Page Url
              </label>
              <input
                type="text"
                name="productPageUrl"
                placeholder="Enter Product Page Url"
                id="productPageUrl"
                className=" w-full h-full p-2 bg-slate-200 border border-slate-400 border-r-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
