import React, { useState, useEffect } from 'react';
import { useSelection } from '../context/SelectionContext';
import { useElements } from '../context/ElementContext';

const EditorPanel: React.FC = () => {
  const { selectedElement, setSelectedElement } = useSelection();
  const { updateElement } = useElements();
  const [params, setParams] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    if (selectedElement) {
      setParams(selectedElement.parameters);
    }
  }, [selectedElement]);

  if (!selectedElement) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = isNaN(Number(value)) ? value : Number(value);
    setParams((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSave = () => {
    updateElement(selectedElement.id, { parameters: params });
    // Optionally clear selection after saving:
    setSelectedElement(null);
  };

  return (
    <div
      className="editor-panel"
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'white',
        padding: '10px',
        border: '1px solid #ccc',
        zIndex: 100,
      }}
    >
      <h3>Edit {selectedElement.type}</h3>
      {Object.keys(params).map((key) => (
        <div key={key} style={{ marginBottom: '5px' }}>
          <label style={{ marginRight: '5px' }}>{key}:</label>
          <input name={key} value={params[key]} onChange={handleChange} />
        </div>
      ))}
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditorPanel;
