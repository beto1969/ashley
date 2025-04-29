import { Billboard, useTexture } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

export default function StarMarker({ position, size = 0.1 }) {
  // Load the star image texture
  // Note: You'll need to add a star.png image to your public folder
  const texture = useTexture('/star.png');
  
  // Make texture transparent and improve rendering
  useEffect(() => {
    if (texture) {
      texture.transparent = true;
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearFilter;
    }
  }, [texture]);

  return (
    <Billboard
      position={position}
      follow={true}
      lockX={false}
      lockY={false}
      lockZ={false}
    >
      <mesh>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial 
          map={texture} 
          transparent={true}
          alphaTest={0.5} 
          side={THREE.DoubleSide}
          color={0xFFFFFF} // Use white color to show original star image colors
        />
      </mesh>
    </Billboard>
  );
}