import React, { useState } from 'react';
import { useGrids } from '../context/GridContext';

type TabType = "horizontalX" | "horizontalZ" | "floors";

const GridDialog: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    grids,
    updateHorizontalXGrid,
    addHorizontalXGrid,
    removeHorizontalXGrid,
    updateHorizontalZGrid,
    addHorizontalZGrid,
    removeHorizontalZGrid,
    updateFloorGrid,
    addFloorGrid,
    removeFloorGrid,
  } = useGrids();

  const [activeTab, setActiveTab] = useState<TabType>("horizontalX");

  const renderTabContent = () => {
    if (activeTab === "horizontalX") {
      return (
        <div>
          {grids.horizontalX.map((grid) => (
            <div key={grid.id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '5px' }}>
              <div><strong>ID:</strong> {grid.id}</div>
              <div>
                <label>Spacing: </label>
                <input
                  type="number"
                  value={grid.spacing}
                  onChange={(e) => updateHorizontalXGrid(grid.id, { spacing: Number(e.target.value) })}
                />
              </div>
              <div>
                <label>Count: </label>
                <input
                  type="number"
                  value={grid.count}
                  onChange={(e) => updateHorizontalXGrid(grid.id, { count: Number(e.target.value) })}
                />
              </div>
              <div>
                <label>Offset: </label>
                <input
                  type="number"
                  value={grid.offset}
                  onChange={(e) => updateHorizontalXGrid(grid.id, { offset: Number(e.target.value) })}
                />
              </div>
              <button onClick={() => removeHorizontalXGrid(grid.id)}>Remove</button>
            </div>
          ))}
          <button
            onClick={() => {
              const newId = "hx-" + Math.random().toString(36).substr(2, 5);
              addHorizontalXGrid({ id: newId, spacing: 1, count: 5, offset: 0 });
            }}
          >
            Add New Horizontal X Grid
          </button>
        </div>
      );
    } else if (activeTab === "horizontalZ") {
      return (
        <div>
          {grids.horizontalZ.map((grid) => (
            <div key={grid.id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '5px' }}>
              <div><strong>ID:</strong> {grid.id}</div>
              <div>
                <label>Spacing: </label>
                <input
                  type="number"
                  value={grid.spacing}
                  onChange={(e) => updateHorizontalZGrid(grid.id, { spacing: Number(e.target.value) })}
                />
              </div>
              <div>
                <label>Count: </label>
                <input
                  type="number"
                  value={grid.count}
                  onChange={(e) => updateHorizontalZGrid(grid.id, { count: Number(e.target.value) })}
                />
              </div>
              <div>
                <label>Offset: </label>
                <input
                  type="number"
                  value={grid.offset}
                  onChange={(e) => updateHorizontalZGrid(grid.id, { offset: Number(e.target.value) })}
                />
              </div>
              <button onClick={() => removeHorizontalZGrid(grid.id)}>Remove</button>
            </div>
          ))}
          <button
            onClick={() => {
              const newId = "hz-" + Math.random().toString(36).substr(2, 5);
              addHorizontalZGrid({ id: newId, spacing: 1, count: 5, offset: 0 });
            }}
          >
            Add New Horizontal Z Grid
          </button>
        </div>
      );
    } else if (activeTab === "floors") {
      return (
        <div>
          {grids.floors.map((grid) => (
            <div key={grid.id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '5px' }}>
              <div><strong>ID:</strong> {grid.id}</div>
              <div>
                <label>Spacing: </label>
                <input
                  type="number"
                  value={grid.spacing}
                  onChange={(e) => updateFloorGrid(grid.id, { spacing: Number(e.target.value) })}
                />
              </div>
              <div>
                <label>Count: </label>
                <input
                  type="number"
                  value={grid.count}
                  onChange={(e) => updateFloorGrid(grid.id, { count: Number(e.target.value) })}
                />
              </div>
              <div>
                <label>Offset: </label>
                <input
                  type="number"
                  value={grid.offset}
                  onChange={(e) => updateFloorGrid(grid.id, { offset: Number(e.target.value) })}
                />
              </div>
              <button onClick={() => removeFloorGrid(grid.id)}>Remove</button>
            </div>
          ))}
          <button
            onClick={() => {
              const newId = "fl-" + Math.random().toString(36).substr(2, 5);
              addFloorGrid({ id: newId, spacing: 3, count: 3, offset: 0 });
            }}
          >
            Add New Floor Grid
          </button>
        </div>
      );
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        padding: '20px',
        zIndex: 200,
        border: '1px solid #ccc',
        width: '400px',
        maxHeight: '80vh',
        overflowY: 'auto',
      }}
    >
      <h3>Edit Grids</h3>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <button
          onClick={() => setActiveTab("horizontalX")}
          style={{ flex: 1, background: activeTab === "horizontalX" ? '#ddd' : '#fff' }}
        >
          Horizontal X
        </button>
        <button
          onClick={() => setActiveTab("horizontalZ")}
          style={{ flex: 1, background: activeTab === "horizontalZ" ? '#ddd' : '#fff' }}
        >
          Horizontal Z
        </button>
        <button
          onClick={() => setActiveTab("floors")}
          style={{ flex: 1, background: activeTab === "floors" ? '#ddd' : '#fff' }}
        >
          Floors
        </button>
      </div>
      <div>{renderTabContent()}</div>
      <div style={{ marginTop: '10px', textAlign: 'right' }}>
        <button onClick={onClose} style={{ marginRight: '10px' }}>
          Cancel
        </button>
        <button onClick={onClose}>Save Grids</button>
      </div>
    </div>
  );
};

export default GridDialog;
