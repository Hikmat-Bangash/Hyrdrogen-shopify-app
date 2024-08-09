import React, {useState, useRef} from 'react';

const images = [
  'https://images.unsplash.com/photo-1706965048366-75bb371fa357?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1706493684415-375cedfb7454?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1706554597534-52032971bb55?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1706425278305-b9440b5fcd1f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
];

const swipeThreshold = 50; // Threshold for swipe distance

const CubeScene = ({isDarkMode}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isSwipingRef = useRef(false);

  const handleSwipe = (direction) => {
    if (direction === 'left' || direction === 'up') {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      );
    } else if (direction === 'right' || direction === 'down') {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1,
      );
    }
    isSwipingRef.current = true;
  };

  const handleTouchStart = (event) => {
    startXRef.current = event.touches[0].pageX;
    startYRef.current = event.touches[0].pageY;
    isSwipingRef.current = false;
  };

  const handleTouchMove = (event) => {
    if (isSwipingRef.current) return;

    const diffX = event.touches[0].pageX - startXRef.current;
    const diffY = event.touches[0].pageY - startYRef.current;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0) handleSwipe('right');
        else handleSwipe('left');
      }
    } else {
      if (Math.abs(diffY) > swipeThreshold) {
        if (diffY > 0) handleSwipe('down');
        else handleSwipe('up');
      }
    }
  };

  const handleTouchEnd = () => {
    isSwipingRef.current = false;
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden ">
      <div className="w-full h-full flex items-center justify-center p-1">
        <img
          src={images[currentIndex]}
          alt="carousel"
          className="w-full h-full object-cover transition-transform duration-500 rounded-sm"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>
      <div className="absolute bottom-0 w-full flex justify-center pb-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CubeScene;
