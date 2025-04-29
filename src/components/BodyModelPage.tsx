import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Plane, Billboard, useTexture } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import StarMarker from './StarMarker';
import * as THREE from 'three';

// Hello Kitty Head component
function HelloKittyHead({ position, scale = 1 }) {
  const texture = useTexture('hello-kitty.png'); // You'll need to add this image to your public folder

  // Make texture transparent
  useEffect(() => {
    if (texture) {
      texture.transparent = true;
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearFilter;
    }
  }, [texture]);

  return (
    <Billboard
      follow={true}
      lockX={false}
      lockY={false}
      lockZ={false}
    >
      <Plane args={[2 * scale, 2 * scale]} position={position}>
        <meshBasicMaterial
          attach="material"
          map={texture}
          transparent={true}
          alphaTest={0.5}
          side={THREE.DoubleSide}
        />
      </Plane>
    </Billboard>
  );
}

function HumanModel({ onClick, kittyPosition, showKitty }) {
  const { scene } = useGLTF('female_model.glb');
  const modelRef = useRef();

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.color.set('white');
    }
  });

  return (
    <group ref={modelRef}>
      <primitive
        object={scene}
        onClick={onClick}
        scale={[3, 3, 3]}
        position={[0, -2, 2]}
      />
      {/* Place Hello Kitty head above model's head */}
      {showKitty && <HelloKittyHead position={kittyPosition} scale={1.5} />}
    </group>
  );
}

export default function BodyModelPage() {
  const [moles, setMoles] = useState([]);
  const [showKitty, setShowKitty] = useState(false);
  const [kittyPosition, setKittyPosition] = useState([0, 5, 0]);

 const handleClick = (e) => {
  e.stopPropagation();

  const { point, face, object } = e;


  const normal = face?.normal.clone();
  object.updateMatrixWorld();
  normal?.applyMatrix3(new THREE.Matrix3().getNormalMatrix(object.matrixWorld)).normalize();


  const offset = 0.025; // tweak this as needed to avoid z-fighting
  const adjustedPoint = point.clone().add(normal.multiplyScalar(offset));

  setMoles((prevMoles) => [...prevMoles, adjustedPoint]);
};

  const handleSave = () => {
    if (moles.length === 0) {
      alert("No stars to save.");
      return;
    }

    const blob = new Blob([JSON.stringify(moles, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const date = new Date().toISOString().split('T')[0]; // e.g., 2025-04-28
    link.href = url;
    link.download = `stars-${date}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleUndo = () => {
    if (moles.length > 0) {
      setMoles((prevMoles) => prevMoles.slice(0, -1));
    }
  };

  const handleReset = () => {
    if (moles.length > 0) {
      if (confirm("Are you sure you want to remove all stars?")) {
        setMoles([]);
      }
    }
  };

  const toggleKitty = () => {
    setShowKitty(prev => !prev);
  };

  // Position control handlers
  const moveKitty = (axis, amount) => {
    setKittyPosition(prev => {
      const newPosition = [...prev];
      const axisIndex = axis === 'x' ? 0 : axis === 'y' ? 1 : 2;
      newPosition[axisIndex] += amount;
      return newPosition;
    });
  };

  return (
    <div className="model-page-container">
      <div className="model-container">
        <Canvas
          camera={{ position: [0, 2, 8], fov: 50 }}
          className="model-canvas"
        >
          <ambientLight intensity={0.9} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <OrbitControls />
          <HumanModel
            onClick={handleClick}
            kittyPosition={kittyPosition}
            showKitty={showKitty}
          />
          {moles.map((pos, idx) => (
            <StarMarker key={idx} position={pos} size={0.08} />
          ))}
        </Canvas>
        <div className="button-group">
          <button
            onClick={handleUndo}
            className="action-button undo-button"
            disabled={moles.length === 0}
          >
            Undo Last
          </button>
          <button
            onClick={handleReset}
            className="action-button reset-button"
            disabled={moles.length === 0}
          >
            Reset All
          </button>
          <button
            onClick={handleSave}
            className="action-button save-button"
            disabled={moles.length === 0}
          >
            Save
          </button>
          <button
            onClick={toggleKitty}
            className="action-button kitty-button"
          >
            {showKitty ? "Hide Kitty" : "Show Kitty"}
          </button>
        </div>


        {showKitty && (
          <div className="kitty-controls">
            <div className="control-label">Kitty Position</div>
            <div className="control-group">
              <div className="axis-controls">
                <span>X: {kittyPosition[0].toFixed(1)}</span>
                <div>
                  <button onClick={() => moveKitty('x', -0.5)}>←</button>
                  <button onClick={() => moveKitty('x', 0.5)}>→</button>
                </div>
              </div>
              <div className="axis-controls">
                <span>Y: {kittyPosition[1].toFixed(1)}</span>
                <div>
                  <button onClick={() => moveKitty('y', -0.5)}>↓</button>
                  <button onClick={() => moveKitty('y', 0.5)}>↑</button>
                </div>
              </div>
              <div className="axis-controls">
                <span>Z: {kittyPosition[2].toFixed(1)}</span>
                <div>
                  <button onClick={() => moveKitty('z', -0.5)}>←</button>
                  <button onClick={() => moveKitty('z', 0.5)}>→</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="sidebar">
        <h2 className="sidebar-title">Current Stars</h2>
        <div className="star-count">
          Total stars: {moles.length}
        </div>
        <div className="mole-list">
          {moles.map((mole, index) => (
            <div key={index} className="mole-card">
              <div><strong>Star {index + 1}</strong></div>
              <div>X: {mole.x.toFixed(2)}</div>
              <div>Y: {mole.y.toFixed(2)}</div>
              <div>Z: {mole.z.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}