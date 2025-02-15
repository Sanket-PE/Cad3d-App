import React from 'react';
import { useSelection } from '../context/SelectionContext';
import { useElements, ElementData } from '../context/ElementContext';
import * as THREE from 'three';

interface FootingProps {
element: ElementData;
}

const Footing: React.FC<FootingProps> = ({element}) => {
  const { setSelectedElement, currentTool } = useSelection();
 const { updateElement } = useElements();
   const meshRef = React.useRef<THREE.Mesh>(null);
   const { parameters, position, id } = element;
   const { width, thickness, depth, color } = parameters;
   // Adjust so that the base is at y = 0
   const adjustedPosition: [number, number, number] = [position[0], position[1] + thickness / 2, position[2]];
 

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
      // Snap to grid: here we round the x and z values.
      const snap = (val: number) => Math.round(val);
      const newPos: [number, number, number] = [snap(point.x), snap(point.y), snap(point.z)];
      updateElement(id, { position: newPos });
    }
  };


  return (
    <mesh
      ref={meshRef}
      position={adjustedPosition}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      onPointerMove={handlePointerMove}
    >
      <boxGeometry args={[width,thickness,depth]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Footing;
