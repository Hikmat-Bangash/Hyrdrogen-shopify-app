import {useLocation} from '@remix-run/react';
import React, {useState} from 'react';
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'react-share';
import {IoMdClose} from 'react-icons/io';

const SharePlatforms = ({setisShare}) => {
  const location = useLocation();
  const [Copied, setCopied] = useState(false);
  const fullUrl = `${window.location.protocol}//${window.location.host}${location.pathname}${location.search}${location.hash}`;

  // Static Image URL
  const staticImageUrl =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7iLYdHDhWcpwkBVKrwzCSX-v8hjOVYyCDnQ&s'; // Replace with your static image URL
  const shareMessage = `Check out this product! Here's the link: ${fullUrl} \n\n[Image Preview]: ${staticImageUrl}`;

  const closeShareModal = () => {
    setisShare((prev) => !prev);
  };

  const handleCopyClick = () => {
    // Copy the input value (the link) to the clipboard
    const linkToCopy = fullUrl;
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        setCopied(true); // Show that the link was copied
        setTimeout(() => setCopied(false), 3000); // Remove the copied state after 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <>
      <div
        className={`w-full h-full z-50 fixed top-0 backdrop-blur-md flex justify-center items-center `}
      >
        <div className="min-h-screen  flex items-center justify-center">
          <div className="relative bg-gray-100 w-full mx-4 p-4 rounded-xl md:w-1/2 lg:w-1/3">
            <div className="flex  justify-between items-center border-b border-gray-200 py-2">
              <div className="flex items-center justify-center">
                <p className="text-xl font-bold text-gray-800">Share product</p>
              </div>

              <div
                className="absolute top-5 right-3  cursor-pointer  font-sans text-gray-500 font-bold text-[2.3rem]  flex items-center justify-center rounded-full"
                onClick={closeShareModal}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    closeShareModal();
                  }
                }}
              >
                <IoMdClose />
              </div>
            </div>

            <div className="my-4">
              <p className="text-sm">Share this link via</p>

              <div className="flex justify-around my-4">
                <WhatsappShareButton url={fullUrl} title={shareMessage}>
                  <WhatsappIcon size={38} round />
                </WhatsappShareButton>
                <FacebookShareButton url={fullUrl} quote={shareMessage}>
                  <FacebookIcon size={38} round />
                </FacebookShareButton>
                <TwitterShareButton url={fullUrl} title={shareMessage}>
                  <TwitterIcon size={38} round />
                </TwitterShareButton>
                <LinkedinShareButton
                  url={fullUrl}
                  title="Check out this product!"
                  summary={shareMessage}
                >
                  <LinkedinIcon size={38} round />
                </LinkedinShareButton>
                <TelegramShareButton url={fullUrl} title={shareMessage}>
                  <TelegramIcon size={38} round />
                </TelegramShareButton>
              </div>

              <p className="text-sm">Or copy link</p>
              <div className="border-2 border-gray-200 flex justify-between items-center mt-4 gap-2 py-2">
                <input
                  className="w-full outline-none bg-transparent"
                  type="text"
                  defaultValue={fullUrl}
                  placeholder="link"
                  readOnly
                />

                <button
                  onClick={handleCopyClick}
                  className={` ${
                    Copied ? 'bg-green-600' : 'bg-indigo-500'
                  }  cursor-pointer text-white rounded text-sm py-2 px-5 mr-2 hover:bg-indigo-600"`}
                >
                  {Copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SharePlatforms;
