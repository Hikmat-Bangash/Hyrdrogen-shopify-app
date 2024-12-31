import {NavLink} from '@remix-run/react';
import React from 'react';
import {toast} from 'react-toastify';

const Myprofile = () => {
  const handleUserAccount = () => {
    toast.error('This features is In-progress');
  };

  return (
    <div className="w-full h-screen px-2">
      <div className="wrapper w-full mt-16">
        <div className="login-heading w-full rounded-md font-semibold flex justify-center items-center p-3 bg-gray-100 uppercase">
          Login your account
        </div>

        <div className="accounts mt-8 flex-col gap-6 w-full flex justify-center items-center ">
          {/* as a vendor */}
          <a
            href="https://1cb12f-54.myshopify.com/pages/vendor"
            target="_blank"
            className=" w-[50%] rounded-md bg-blue-100 uppercase hover:bg-blue-200 flex  justify-center items-center p-2"
            rel="noreferrer"
          >
            as a Vendor
          </a>

          {/* as a user */}
          <button
            className=" w-[50%] rounded-md bg-blue-100 hover:bg-blue-200 uppercase justify-center items-center p-2"
            onClick={handleUserAccount}
          >
            as a User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
