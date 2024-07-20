// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-unknown-property */
import React, {useRef, useState, useEffect} from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap-trial';

const Cube = ({rotation}) => {
  const images = [
    // '/splash/watch1.png',
    // '/splash/watch2.png',
    // '/splash/watch3.png',
    // '/splash/watch4.png',
    // '/splash/watch5.png',

    'https://images.unsplash.com/photo-1706965048366-75bb371fa357?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1706493684415-375cedfb7454?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1706554597534-52032971bb55?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1706425278305-b9440b5fcd1f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1706554597534-52032971bb55?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1706554597534-52032971bb55?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];
  const ref = useRef();
  const loader = new THREE.TextureLoader();
  const textures = [
    loader.load(images[0]),
    loader.load(images[1]),
    loader.load(images[2]),
    loader.load(images[3]),
    loader.load(images[4]),
    loader.load(images[5]),
  ];

  // Array of materials using the textures
  const materials = textures.map(
    (texture) => new THREE.MeshBasicMaterial({map: texture}),
  );

  // Apply the rotation from the swipe
  useEffect(() => {
    gsap.to(ref.current.rotation, {
      x: rotation.x,
      y: rotation.y,
      z: rotation.z,
      duration: 1,
      ease: 'power3.inOut',
    });
  }, [rotation]);

  return (
    <mesh
      className="w-4 h-4"
      ref={ref}
      geometry={new THREE.BoxGeometry(4.5, 4.5, 4.5)}
      material={materials}
    />
  );
};

const CubeScene = ({isDarkMode}) => {
  const [rotation, setRotation] = useState(new THREE.Euler(0, 0, 0));

  const handleSwipe = (direction) => {
    const newRotation = rotation.clone();

    switch (direction) {
      case 'left':
        newRotation.y -= Math.PI / 2;
        break;
      case 'right':
        newRotation.y += Math.PI / 2;
        break;
      case 'up':
        newRotation.x += Math.PI / 2;
        break;
      case 'down':
        newRotation.x -= Math.PI / 2;
        break;
      default:
        break;
    }

    setRotation(newRotation);
  };

  // Detecting swipe logic (simplified for illustration)
  const handleTouchStart = (event) => {
    const startX = event.touches[0].pageX;
    const startY = event.touches[0].pageY;

    const handleTouchMove = (e) => {
      const moveX = e.touches[0].pageX;
      const moveY = e.touches[0].pageY;

      const diffX = moveX - startX;
      const diffY = moveY - startY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal movement
        if (diffX > 0) handleSwipe('right');
        else handleSwipe('left');
      } else {
        // Vertical movement
        if (diffY > 0) handleSwipe('down');
        else handleSwipe('up');
      }

      document.removeEventListener('touchmove', handleTouchMove);
    };

    document.addEventListener('touchmove', handleTouchMove);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center   ">
      <Canvas
        className={`z-0  p-4`}
        style={{
          backgroundImage: isDarkMode
            ? "url('/splash/dark-mode-screen.png')"
            : "url('/splash/light-mode-screen.png')",

          backgroundSize: '100% 100%',
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Cube rotation={rotation} />
        <OrbitControls enableZoom={false} />
      </Canvas>
      <div
        onTouchStart={handleTouchStart}
        className="absolute top-0 left-0 right-0 bottom-0"
      />
    </div>
  );
};

export default CubeScene;
