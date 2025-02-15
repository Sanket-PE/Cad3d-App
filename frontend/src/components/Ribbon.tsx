import React, { useState } from 'react';
import { useSelection } from '../context/SelectionContext';
import { useElements } from '../context/ElementContext';
//import { useGrids } from '../context/GridContext';

interface RibbonProps {
  onEditGrids: () => void;
}
const Ribbon: React.FC<RibbonProps> = ({onEditGrids}) => {
  const { currentTool, setCurrentTool } = useSelection();
  const { addElement } = useElements();
  //const { addGrid } = useGrids();
  const [command, setCommand] = useState('');

  // Example snap function (grid spacing assumed to be 1 by default)
  const snap = (val: number) => Math.round(val);
  const defaultPosition: [number, number, number] = [snap(0), snap(0), snap(0)];

  const handleAddElement = (type: string) => {
    const id = type.toLowerCase() + '-' + Math.random().toString(36).substr(2, 9);
    let parameters: any = {};
    switch (type) {
      case 'Column':
        parameters = { width: 1, depth: 1, height: 5, color: 'orange' };
        break;
      case 'Beam':
        parameters = { width: 0.5, depth: 0.5, length: 10, color: 'brown' };
        break;
      case 'Footing':
        parameters = { width: 5, depth: 5, thickness: 0.5, color: 'gray' };
        break;
      case 'Slab':
        parameters = { width: 10, depth: 10, thickness: 0.25, color: 'lightgray' };
        break;
      case 'ShearWall':
        parameters = { length: 5, height: 10, thickness: 0.3, color: 'purple' };
        break;
      default:
        return;
    }
    addElement({ id, type, parameters, position: defaultPosition });
  };


  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = command.trim().toLowerCase();
    if (cmd === 'col') handleAddElement('Column');
    else if (cmd === 'be') handleAddElement('Beam');
    else if (cmd === 'sl') handleAddElement('Slab');
    else if (cmd === 'fot') handleAddElement('Footing');
    else if (cmd === 'sw') handleAddElement('ShearWall');
    setCommand('');
  };

  return (
    <div
      className="ribbon"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        padding: '10px',
        background: '#ddd',
        zIndex: 100,
      }}
    >
      <button onClick={() => setCurrentTool('select')} style={{ marginRight: '10px' }}>
        Select
      </button>
      <button onClick={() => setCurrentTool('move')} style={{ marginRight: '10px' }}>
        Move
      </button>
      <button onClick={() => handleAddElement('Column')} style={{ marginRight: '10px' }}>
        Add Column
      </button>
      <button onClick={() => handleAddElement('Beam')} style={{ marginRight: '10px' }}>
        Add Beam
      </button>
      <button onClick={() => handleAddElement('Slab')} style={{ marginRight: '10px' }}>
        Add Slab
      </button>
      <button onClick={() => handleAddElement('Footing')} style={{ marginRight: '10px' }}>
        Add Footing
      </button>
      <button onClick={() => handleAddElement('ShearWall')} style={{ marginRight: '10px' }}>
        Add ShearWall
      </button>
      <button onClick={onEditGrids} style={{ marginRight: '10px' }}>
        Edit Grids
      </button>
      <span style={{ marginLeft: '10px' }}>Current Tool: {currentTool}</span>
      <form onSubmit={handleCommandSubmit} style={{ display: 'inline', marginLeft: '10px' }}>
        <input
          type="text"
          placeholder="Enter command (col, be, sl, fot, sw)"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
        <button type="submit">Go</button>
      </form>
    </div>
  );
};

export default Ribbon;
