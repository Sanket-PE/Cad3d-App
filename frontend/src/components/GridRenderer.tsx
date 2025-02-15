// src/components/GridRenderer.tsx
import React from 'react';
import { useGrids } from '../context/GridContext';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

const GridRenderer: React.FC = () => {
  const { grids } = useGrids();
  const { horizontalX, horizontalZ, floors } = grids;

  // Compute overall extents using all grid definitions.
  const xMin =
    horizontalZ.length > 0
      ? Math.min(...horizontalZ.map((g) => g.offset - g.spacing / 2))
      : -50;
  const xMax =
    horizontalZ.length > 0
      ? Math.max(...horizontalZ.map((g) => g.offset + g.spacing * g.count - g.spacing / 2))
      : 50;
  const zMin =
    horizontalX.length > 0
      ? Math.min(...horizontalX.map((g) => g.offset - g.spacing / 2))
      : -50;
  const zMax =
    horizontalX.length > 0
      ? Math.max(...horizontalX.map((g) => g.offset + g.spacing * g.count - g.spacing / 2))
      : 50;

  // Define label offsets for each direction.
  const labelOffsetX = 1; // Offset along X for horizontal X grid labels
  const labelOffsetZ = 1; // Offset along Z for horizontal Z grid labels
  const labelOffsetFloor = 1; // Offset for floor grid labels

  // Helper function to create a line primitive.
  const createLine = (points: THREE.Vector3[], color: string) => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color });
    return <primitive object={new THREE.Line(geometry, material)} />;
  };

  // Helper to render a label with a circular background.
  const renderLabel = ( position: THREE.Vector3, label: string, color: string,
    textAnchor: { anchorX: "left" | "center" | "right"; anchorY: "top" | "bottom" | "middle" | "top-baseline" | "bottom-baseline" },
    rotation: [number, number, number] = [-Math.PI / 2, 0, 0]
  ) => (
    <group position={position} rotation={rotation}>
      {/* Circular background */}
      <line>
        <ringGeometry args={[0.4, 0.4,36,0,0,7]} />
        <lineBasicMaterial color={color}/>
      </line>
      <Text
        fontSize={0.5}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );

  // Use a default floor if none is defined.
  const floorsToUse =
    floors.length > 0 ? floors : [{ id: 'default-floor', offset: 0, count: 1, spacing: 0 }];


  return (
    <>
      {/* Render Horizontal X grid lines (parallel to X, varying in Z) on each floor level */}
      {floorsToUse.map((floor, fIndex) =>
        Array.from({ length: floor.count }).map((_, fi) => {
          const y = floor.offset + fi * floor.spacing;
          return horizontalX.map((grid) =>
            Array.from({ length: grid.count }).map((_, i) => {
              const z = grid.offset + i * grid.spacing;
              const label = String.fromCharCode(65 + i); // A, B, C, etc.
              const start = new THREE.Vector3(xMin - labelOffsetX / 1.5, y, z);
              const end = new THREE.Vector3(xMax + labelOffsetX / 1.5, y, z);
              const points = [start, end];
              return (
                <group key={`hx-${grid.id}-${fIndex}-${fi}-${i}`}>
                  {createLine(points, 'grey')}
                  {renderLabel(
                    new THREE.Vector3(xMin - labelOffsetX, y, z),
                    label,
                    "grey",
                    { anchorX: "right", anchorY: "middle" }
                  )}
                  {renderLabel(
                    new THREE.Vector3(xMax + labelOffsetX, y, z),
                    label,
                    "grey",
                    { anchorX: "left", anchorY: "middle" }
                  )}
                </group>
              );
            })
          );
        })
      )}

      {/* Render Horizontal Z grid lines (parallel to Z, varying in X) on each floor level */}
      {floorsToUse.map((floor, fIndex) =>
        Array.from({ length: floor.count }).map((_, fi) => {
          const y = floor.offset + fi * floor.spacing;
          return horizontalZ.map((grid) =>
            Array.from({ length: grid.count }).map((_, i) => {
              const x = grid.offset + i * grid.spacing;
              const label = (i + 1).toString();
              const start = new THREE.Vector3(x, y, zMin - labelOffsetZ / 1.5);
              const end = new THREE.Vector3(x, y, zMax + labelOffsetZ / 1.5);
              const points = [start, end];
              return (
                <group key={`hz-${grid.id}-${fIndex}-${fi}-${i}`}>
                  {createLine(points, 'grey')}
                  {renderLabel(
                    new THREE.Vector3(x, y, zMin - labelOffsetZ),
                    label,
                    "grey",
                    { anchorX: "center", anchorY: "top" }
                  )}
                  {renderLabel(
                    new THREE.Vector3(x, y, zMax + labelOffsetZ),
                    label,
                    "grey",
                    { anchorX: "center", anchorY: "bottom" }
                  )}
                </group>
              );
            })
          );
        })
      )}

      {/* Render Floor grids (rectangle outlines) */}
      {floorsToUse.map((grid, fIndex) =>
        Array.from({ length: grid.count }).map((_, i) => {
          const y = grid.offset + i * grid.spacing;
          const label = (i + 1).toString();
          // Define the four corners of the floor grid rectangle.
          const corners = [
            new THREE.Vector3(xMin, y, zMin),
            new THREE.Vector3(xMax, y, zMin),
            new THREE.Vector3(xMax, y, zMax),
            new THREE.Vector3(xMin, y, zMax),
          ];
          return (
            <group key={`floor-${grid.id}-${fIndex}-${i}`}>
              <primitive
                object={new THREE.LineLoop(
                  new THREE.BufferGeometry().setFromPoints([...corners, corners[0]]),
                  new THREE.LineBasicMaterial({ color: 'grey' })
                )}
              />
              {renderLabel(
                new THREE.Vector3(xMin - labelOffsetFloor, y, zMin - labelOffsetFloor),
                label,
                "grey",
                { anchorX: "left", anchorY: "bottom" }
              )}
              {renderLabel(
                new THREE.Vector3(xMax + labelOffsetFloor, y, zMax + labelOffsetFloor),
                label,
                "grey",
                { anchorX: "right", anchorY: "top" }
              )}
            </group>
          );
        })
      )}
    </>
  );
};

export default GridRenderer;
