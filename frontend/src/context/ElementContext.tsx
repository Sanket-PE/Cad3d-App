import React, { createContext, useContext, useState } from 'react';

export interface ElementData {
  id: string;
  type: string; // "Column", "Beam", "Slab", "Footing", "ShearWall"
  parameters: { [key: string]: any };
  position: [number, number, number];
}

interface ElementContextProps {
  elements: ElementData[];
  addElement: (element: ElementData) => void;
  updateElement: (id: string, newData: Partial<ElementData>) => void;
}

const ElementContext = createContext<ElementContextProps | undefined>(undefined);

export const ElementProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [elements, setElements] = useState<ElementData[]>([]);

  const addElement = (element: ElementData) => {
    setElements((prev) => [...prev, element]);
  };

  const updateElement = (id: string, newData: Partial<ElementData>) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === id
          ? {
              ...el,
              ...newData,
              parameters: { ...el.parameters, ...(newData.parameters || {}) },
              position: newData.position || el.position,
            }
          : el
      )
    );
  };

  return (
    <ElementContext.Provider value={{ elements, addElement, updateElement }}>
      {children}
    </ElementContext.Provider>
  );
};

export const useElements = () => {
  const context = useContext(ElementContext);
  if (!context) {
    throw new Error('useElements must be used within an ElementProvider');
  }
  return context;
};
