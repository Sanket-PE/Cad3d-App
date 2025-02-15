// src/context/SelectionContext.tsx
import React, { createContext, useContext, useState } from 'react';

export interface StructuralElement {
  id: string;
  type: string;
  parameters: { [key: string]: any };
}

interface SelectionContextProps {
  selectedElement: StructuralElement | null;
  setSelectedElement: (element: StructuralElement | null) => void;
  currentTool: string;
  setCurrentTool: (tool: string) => void;
}

const SelectionContext = createContext<SelectionContextProps | undefined>(undefined);

export const SelectionProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [selectedElement, setSelectedElement] = useState<StructuralElement | null>(null);
  const [currentTool, setCurrentTool] = useState<string>('select'); // 'select' or 'move'
  
  return (
    <SelectionContext.Provider value={{ selectedElement, setSelectedElement, currentTool, setCurrentTool }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};
