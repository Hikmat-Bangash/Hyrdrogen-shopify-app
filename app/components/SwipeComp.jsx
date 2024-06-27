import React, {useState} from 'react';
import CreateCategory from '~/components/CreateCategory';
import CreateHeading from '~/components/CreateHeading';
import CreateProduct from '~/components/CreateProduct';

const SwipeComp = () => {
  const [categories, setCategories] = useState([<CreateCategory key={0} />]);
  const [headings, setHeadings] = useState([<CreateHeading key={0} />]);
  const [products, setProducts] = useState([<CreateProduct key={0} />]);

  const [activeTab, setActiveTab] = useState(1);
  ////Add delete Category form
  const handleAddCategory = () => {
    const newKey = categories.length;
    setCategories([...categories, <CreateCategory key={newKey} />]);
  };
  const handleDeleteCategory = (index) => {
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    setCategories(newCategories);
  };

  ///Add or delete Product form

  const handleAddProduct = () => {
    const newKey3 = products.length;
    setProducts([...products, <CreateProduct key={newKey3} />]);
  };
  const handleDeleteProduct = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const handleAddHeading = () => {
    const newKey1 = headings.length;
    setHeadings([...headings, <CreateHeading key={newKey1} />]);
  };
  const handleDeleteHeading = (index) => {
    const newheading = [...headings];
    newheading.splice(index, 1);
    setHeadings(newheading);
  };

  const handleNext = () => {
    setActiveTab(activeTab + 1);
  };

  const handlePrev = () => {
    setActiveTab(activeTab - 1);
  };

  const handleSubmit = () => {
    // Handle submission logic here
    alert('Form submitted!');
  };
  return (
    <div className="mt-[12%] bg-yellow-100 overflow-y-auto mb-10 ">
      <div className="w-full h-[300px] flex flex-col items-center  bg-yellow-500   ">
        <div className="w-[344px] h-[40px] mt-[22px] text-center">
          <h1 className="m-0 font-avenir text-[32px] font-bold leading-40 text-center p-0">
            SpinSwipe Creator
          </h1>
        </div>
        <div className="w-full h-[20px] p-1   ">
          <h1 className=" m-0 p-0 w-full h-full font-source text-base font-normal text-[15px] text-center  ">
            Fill the form below to add product to the Spinswipe
          </h1>
        </div>
      </div>
      <div className="w-full h-auto flex flex-row items-center justify-center absolute top-[15%] mt-5   ">
        <div className="w-[90%]  min-h-full h-auto bg-yellow-50  ">
          <div className="w-full h-full max-h-auto flex flex-row justify-center pt-5 ">
            <div className="w-[90%] h-full flex flex-col items-center overflow-y-scroll">
              <div className="w-full h-[60px] flex flex-row " id="tabdetail">
                <div
                  className={`flex-1 flex flex-col items-center justify-center cursor-pointer ${
                    activeTab === 1 ? 'border border-black border-dotted' : ''
                  } hover:bg-gray-100 hover:border-gray-400`}
                  onClick={() => {
                    setActiveTab(1);
                  }}
                  id="tab1"
                >
                  {/* <div></div> */}
                  <circle
                    className={`w-[21px] h-[21px] flex flex-row items-center justify-center text-white
              ${activeTab === 1 ? 'bg-black' : 'bg-slate-400'}
  `}
                    style={{
                      borderRadius: '50%',
                    }}
                  >
                    1
                  </circle>

                  <h3
                    className="p-1"
                    style={{
                      fontFamily: 'Source Sans Pro',
                      fontSize: '14px',
                      fontWeight: '400',
                      lineHeight: '14px',
                      textAlign: 'center',
                    }}
                  >
                    Add Category
                  </h3>
                </div>
                <div
                  className={`flex-1 flex flex-col items-center justify-center cursor-pointer ${
                    activeTab === 2 ? 'border border-black border-dotted' : ''
                  } hover:bg-gray-100 hover:border-gray-400`}
                  onClick={() => {
                    setActiveTab(2);
                  }}
                  id="tab2"
                >
                  <circle
                    className={`w-[21px] h-[21px] flex flex-row items-center justify-center text-white
                    ${activeTab === 2 ? 'bg-black' : 'bg-slate-400'}
                    `}
                    style={{
                      borderRadius: '50%',
                    }}
                  >
                    2
                  </circle>
                  <h3
                    className="p-1"
                    style={{
                      fontFamily: 'Source Sans Pro',
                      fontSize: '14px',
                      fontWeight: '400',
                      lineHeight: '14px',
                      textAlign: 'center',
                    }}
                  >
                    Add Headings
                  </h3>
                </div>
                <div
                  className={`flex-1 flex flex-col items-center justify-center cursor-pointer ${
                    activeTab === 3 ? 'border border-black border-dotted' : ''
                  } hover:bg-gray-100 hover:border-gray-400`}
                  onClick={() => {
                    setActiveTab(3);
                  }}
                  id="tab3"
                >
                  <circle
                    className={`w-[21px] h-[21px]  flex flex-row items-center justify-center text-white
                    ${activeTab === 3 ? 'bg-black' : 'bg-slate-400'}
                    `}
                    style={{
                      borderRadius: '50%',
                    }}
                  >
                    3
                  </circle>
                  <h3
                    className="p-1"
                    style={{
                      fontFamily: 'Source Sans Pro',
                      fontSize: '14px',
                      fontWeight: '400',
                      lineHeight: '14px',
                      textAlign: 'center',
                    }}
                  >
                    Add Products
                  </h3>
                </div>
              </div>

              {activeTab === 1 && (
                <div className="w-full min-h-[773px] h-auto" id="tabdev1">
                  <div className="w-full h-auto">
                    <h3
                      className=" m-0  text-lg pt-5  "
                      style={{
                        fontFamily: 'Source Sans Pro',
                        fontSize: '18px',
                        fontWeight: '600',
                        lineHeight: '24px',
                        // textAlign: 'center',
                      }}
                    >
                      Select Sex
                    </h3>
                  </div>
                  <div className="w-full h-[25px] flex flex-row justify-around pt-2 ">
                    <div className=" flex flex-row flex-1 justify-evenly items-center ">
                      <input
                        id="men"
                        type="radio"
                        placeholder="men"
                        value="men"
                        className="text-black"
                      />{' '}
                      <label>Men</label>
                    </div>
                    <div className="flex flex-row flex-1 justify-evenly items-center ">
                      <input
                        id="women"
                        type="radio"
                        placeholder="women"
                        value="women"
                        className="text-black"
                      />
                      <label>Women</label>
                    </div>
                    <div className="flex flex-row flex-1 justify-evenly items-center ">
                      <input
                        id="neutral"
                        type="radio"
                        placeholder="neutral"
                        value="neutral"
                        className="text-black"
                      />
                      <label>Neutral</label>
                    </div>
                    <div className="flex flex-row flex-1 justify-evenly items-center ">
                      <input
                        id="all"
                        type="radio"
                        placeholder="all"
                        value="all"
                        className="text-black"
                      />
                      <label>All</label>
                    </div>
                  </div>
                  <div className="w-full  pt-5 ">
                    <h1
                      style={{
                        margin: '0px',
                        padding: '0px',
                        fontFamily: 'Source Sans Pro',
                        fontSize: '18px',
                        fontWeight: '600',
                        lineHeight: '24px',
                        // textAlign: 'center',
                      }}
                    >
                      General Category Name
                    </h1>
                  </div>
                  <div className="w-full flex flex-row items-center bg-green-00 pt-2">
                    <input
                      type="checkbox"
                      value="checkbox"
                      name="checksingleproduct"
                    />
                    <label
                      style={{
                        marginLeft: '8px',
                        fontFamily: 'Source Sans Pro',
                        fontSize: '14px',
                        fontWeight: '400',
                        lineHeight: '20px',
                        // textAlign: 'center',
                      }}
                    >
                      I only sell single category of products
                    </label>
                    {/* <h3>I only sell single category of products</h3> */}
                  </div>

                  <div className="flex flex-row gap-2 overflow-x-auto w-full h-[60px] mt-5">
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                  </div>
                  <div className="w-full h-[282px] mt-5 flex flex-col ">
                    {/* <CreateCategory /> */}
                    <div
                      className="w-full h-full gap-2 overflow-x-auto"
                      style={{scrollSnaptype: 'y'}}
                    >
                      {categories.map((category, index) => (
                        <div key={index}>
                          <CreateCategory
                            key={index}
                            handleDeleteCategory={handleDeleteCategory}
                            index={index}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full h-auto mt-4 flex flex-row">
                    <button
                      className="  w-[150px] h-[40px]  border border-yellow-600 hover:bg-yellow-100 hover:border-yellow-400 "
                      onClick={handleAddCategory}
                    >
                      + Add Category
                    </button>

                    {/* <button
         className="  w-[150px] h-[40px]  border border-yellow-600 "
         onClick={handleAddCategory}
       >
         delete
       </button> */}
                  </div>
                  <button
                    className="w-full h-[45px] bg-yellow-600 text-center mt-3 hover:bg-yellow-400 hover:border-yellow-600 flex flex-row justify-center items-center "
                    onClick={handleNext}
                  >
                    <h3
                      style={{
                        fontFamily: 'Avenir LT Std',
                        fontSize: '16px',
                        fontWeight: '700',
                        lineHeight: '26px',
                        textAlign: 'left',
                      }}
                    >
                      Next
                    </h3>
                  </button>
                </div>
              )}

              {activeTab === 2 && (
                <div className="w-full  h-auto" id="tabdev2">
                  <div className="w-full h-auto flex flex-row items-center  ">
                    <img
                      src="splash/xaxis.png"
                      alt="xaxis"
                      className="pl-3 h-[26px] w-[11.5px]"
                    />
                    <h3
                      className="ml-2"
                      style={{
                        fontFamily: 'Source Sans Pro',
                        fontSize: '18px',
                        fontWeight: '600',
                        lineHeight: '24px',
                      }}
                    >
                      X-axis Heading
                    </h3>
                  </div>
                  <div className="w-full h-auto flex flex-row">
                    <h3
                      style={{
                        fontFamily: 'Source Sans Pro',
                        fontSize: '14px',
                        fontWeight: '400',
                        lineHeight: '20px',
                        // text-align: center;
                      }}
                    >
                      Select the desired category to add headings
                    </h3>
                  </div>

                  <div className="flex flex-row gap-2 overflow-x-auto w-full h-[60px] mt-5">
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                  </div>
                  <div className="w-full h-[182px] mt-5 flex flex-col ">
                    <div
                      className="w-full h-full gap-2 overflow-x-auto"
                      style={{scrollSnaptype: 'y'}}
                    >
                      {headings.map((heading, index) => (
                        <div key={index}>
                          <CreateHeading
                            key={index}
                            handleDeleteCategory={handleDeleteHeading}
                            index={index}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full h-auto mt-4 flex flex-row">
                    <button
                      className="  w-[150px] h-[40px]  border border-yellow-600 hover:bg-yellow-100 hover:border-yellow-400 "
                      onClick={handleAddHeading}
                    >
                      + Add Heading
                    </button>
                  </div>
                  <div className="w-full h-[44px]  mt-[10px]  ">
                    <div className="w-full h-full flex flex-row justify-center items-center ">
                      <h3
                        className="m-0 p-0"
                        style={{
                          fontFamily: 'Source Sans Pro',
                          fontSize: '14px',
                          fontWeight: '400',
                          lineHeight: '22px',
                          textAlign: 'center',
                        }}
                      >
                        Select another category to add headings or click Next to
                        proceed to add products
                      </h3>
                      {/* <div className="w-7 h-7 bg-red-600"></div> */}
                    </div>
                  </div>
                  <button
                    className="w-full h-[45px] bg-yellow-600 text-center mt-3 hover:bg-yellow-400 hover:border-yellow-600 flex flex-row justify-center items-center "
                    onClick={handleNext}
                  >
                    <h3
                      style={{
                        fontFamily: 'Avenir LT Std',
                        fontSize: '16px',
                        fontWeight: '700',
                        lineHeight: '26px',
                        textAlign: 'left',
                      }}
                    >
                      Next
                    </h3>
                  </button>
                </div>
              )}

              {activeTab === 3 && (
                <div
                  className="w-full min-h-[750px] h-auto mb-[100px]"
                  id="tabdev3"
                >
                  <div className="w-full h-auto flex flex-row items-center  ">
                    <img
                      src="splash/xaxis.png"
                      alt="xaxis"
                      className="pl-3 h-[26px] w-[11.5px]"
                    />
                    <h3
                      className="ml-2"
                      style={{
                        fontFamily: 'Source Sans Pro',
                        fontSize: '18px',
                        fontWeight: '600',
                        lineHeight: '24px',
                      }}
                    >
                      Y-axis Products
                    </h3>
                  </div>
                  <div className="w-full h-auto flex flex-row">
                    <h3
                      style={{
                        fontFamily: 'Source Sans Pro',
                        fontSize: '14px',
                        fontWeight: '400',
                        lineHeight: '20px',
                        // text-align: center;
                      }}
                    >
                      Select the desired category to add headings
                    </h3>
                  </div>

                  <div className="flex flex-row gap-2 overflow-x-auto w-full h-[60px] mt-5">
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                    <div className="min-w-[128px] h-full bg-yellow-600"></div>
                  </div>
                  <div className="flex flex-row gap-4 overflow-x-auto w-full h-[32px] mt-3">
                    <div className="min-w-[90px] h-full bg-yellow-600 rounded-[4px] "></div>
                    <div className="min-w-[90px] h-full bg-yellow-600 rounded-[4px] "></div>
                    <div className="min-w-[90px] h-full bg-yellow-600 rounded-[4px] "></div>
                    <div className="min-w-[90px] h-full bg-yellow-600 rounded-[4px] "></div>
                    <div className="min-w-[90px] h-full bg-yellow-600 rounded-[4px] "></div>
                    <div className="min-w-[90px] h-full bg-yellow-600 rounded-[4px] "></div>
                    <div className="min-w-[90px] h-full bg-yellow-600 rounded-[4px] "></div>
                  </div>
                  <div className="w-full h-auto mt-5 flex flex-col ">
                    {/* <CreateCategory /> */}
                    <div
                      className="w-full h-[710px] gap-2 overflow-x-auto"
                      style={{scrollSnaptype: 'y'}}
                    >
                      {products.map((product, index) => (
                        <div key={index}>
                          <CreateProduct
                            key={index}
                            handleDeleteProduct={handleDeleteProduct}
                            index={index}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full h-auto mt-4 flex flex-row">
                    <button
                      className="  w-[150px] h-[40px]  border border-yellow-600 hover:bg-yellow-100 hover:border-yellow-400 "
                      onClick={handleAddProduct}
                    >
                      + Add Product
                    </button>
                  </div>
                  <button
                    className="w-full h-[45px] bg-yellow-600 text-center mt-3 hover:bg-yellow-400 hover:border-yellow-600 flex flex-row justify-center items-center "
                    onClick={handleSubmit}
                  >
                    <h3
                      style={{
                        fontFamily: 'Avenir LT Std',
                        fontSize: '16px',
                        fontWeight: '700',
                        lineHeight: '26px',
                        textAlign: 'left',
                      }}
                    >
                      Submit
                    </h3>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="w-full h-full bg-yellow-100"></div>
  );
};

export default SwipeComp;
