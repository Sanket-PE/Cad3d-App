import React from 'react';
import GridRenderer from '../components/GridRenderer';
import { useElements } from '../context/ElementContext';
import Column from '../components/Column';
import Beam from '../components/Beam';
import Footing from '../components/Footing';
import Slab from '../components/Slab';
import ShearWall from '../components/ShearWall';

const GridScene: React.FC = () => {
  const { elements } = useElements();

  return (
    <>
      <GridRenderer />
      {elements.map((el) => {
        switch (el.type) {
          case 'Column':
            return <Column key={el.id} element={el} />;
          case 'Beam':
            return <Beam key={el.id} element={el} />;
          case 'Footing':
            return <Footing key={el.id} element={el} />;
          case 'Slab':
            return <Slab key={el.id} element={el} />;
          case 'ShearWall':
            return <ShearWall key={el.id} element={el} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default GridScene;
