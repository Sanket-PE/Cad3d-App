import React from 'react';
import { useSelection } from '../context/SelectionContext';
import { useElements, ElementData } from '../context/ElementContext';
import * as THREE from 'three';

interface BeamProps {
  element: ElementData;
}

const Beam: React.FC<BeamProps> = ({ element }) => {
  const { setSelectedElement, currentTool } = useSelection();
  const { updateElement } = useElements();
  const meshRef = React.useRef<THREE.Mesh>(null);
  const { parameters, position, id } = element;
  const { width, depth, length, color } = parameters;
  const pos = position;

  const handleDoubleClick = (e: any) => {
    e.stopPropagation();
    setSelectedElement(element);
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    setSelectedElement(element);
  };

  const handlePointerMove = (e: any) => {
    if (currentTool === 'move' && meshRef.current) {
      const point = e.point;
      const snap = (val: number) => Math.round(val);
      const newPos: [number, number, number] = [snap(point.x), snap(point.y), snap(point.z)];
      updateElement(id, { position: newPos });
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={pos}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      onPointerMove={handlePointerMove}
    >
      <boxGeometry args={[length, depth, width]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Beam;
