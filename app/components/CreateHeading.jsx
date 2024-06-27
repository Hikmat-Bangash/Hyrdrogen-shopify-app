import React from 'react';

const CreateHeading = (props) => {
  const {handleDeleteHeading, index} = props;
  console.log(index);
  const handleDelete = () => {
    handleDeleteHeading(index);
  };
  return (
    <div className="w-full h-[182px] " id="categorysnippet">
      <div className="w-full h-full flex flex-col items-start ">
        <div className="w-full h-[182px] bg-slate-200 flex flex-row justify-center">
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
                  Heading1
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
                Heading Name
              </label>
              <input
                type="text"
                name="headingname"
                placeholder="Enter heading name"
                id="headingname"
                className="p-2 bg-slate-200 border border-slate-400 border-r-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateHeading;
