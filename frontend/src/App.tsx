import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import GridScene from './scenes/GridScene';
import { SelectionProvider } from './context/SelectionContext';
import { ElementProvider } from './context/ElementContext';
import { GridProvider } from './context/GridContext';
import EditorPanel from './components/EditorPanel';
import Ribbon from './components/Ribbon';
import GridDialog from './components/GridDialog';

const App: React.FC = () => {
  const [showGridDialog, setShowGridDialog] = useState(false);

  return (
    <SelectionProvider>
      <ElementProvider>
        <GridProvider>
          <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
            <Ribbon onEditGrids={() => setShowGridDialog(true)} />
            {showGridDialog && <GridDialog onClose={() => setShowGridDialog(false)} />}
            <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <GridScene />
              <OrbitControls />
            </Canvas>
            <EditorPanel />
          </div>
        </GridProvider>
      </ElementProvider>
    </SelectionProvider>
  );
};

export default App;
