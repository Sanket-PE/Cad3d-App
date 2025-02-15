import React, { createContext, useContext, useState } from 'react';

export interface HorizontalGrid {
  id: string;
  spacing: number;
  count: number;
  offset: number;
}
export interface FloorGrid {
  id: string;
  spacing: number;
  count: number;
  offset: number;
}

export interface GridsState {
  horizontalX: HorizontalGrid[];
  horizontalZ: HorizontalGrid[];
  floors: FloorGrid[];
}

interface GridContextProps {
  grids: GridsState;
  // Horizontal X functions
  updateHorizontalXGrid: (id: string, data: Partial<HorizontalGrid>) => void;
  addHorizontalXGrid: (grid: HorizontalGrid) => void;
  removeHorizontalXGrid: (id: string) => void;
  // Horizontal Z functions
  updateHorizontalZGrid: (id: string, data: Partial<HorizontalGrid>) => void;
  addHorizontalZGrid: (grid: HorizontalGrid) => void;
  removeHorizontalZGrid: (id: string) => void;
  // Floor functions
  updateFloorGrid: (id: string, data: Partial<FloorGrid>) => void;
  addFloorGrid: (grid: FloorGrid) => void;
  removeFloorGrid: (id: string) => void;
}

const defaultGrids: GridsState = {
  horizontalX: [{ id: 'hx-1', spacing: 1, count: 5, offset: 0 }],
  horizontalZ: [{ id: 'hz-1', spacing: 1, count: 5, offset: 0 }],
  floors: [{ id: 'fl-1', spacing: 3, count: 3, offset: 0 }],
};

const GridContext = createContext<GridContextProps | undefined>(undefined);

export const GridProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [grids, setGrids] = useState<GridsState>(defaultGrids);

  const updateHorizontalXGrid = (id: string, data: Partial<HorizontalGrid>) => {
    setGrids(prev => ({
      ...prev,
      horizontalX: prev.horizontalX.map(grid =>
        grid.id === id ? { ...grid, ...data } : grid
      ),
    }));
  };

  const addHorizontalXGrid = (grid: HorizontalGrid) => {
    setGrids(prev => ({
      ...prev,
      horizontalX: [...prev.horizontalX, grid],
    }));
  };

  const removeHorizontalXGrid = (id: string) => {
    setGrids(prev => ({
      ...prev,
      horizontalX: prev.horizontalX.filter(grid => grid.id !== id),
    }));
  };

  const updateHorizontalZGrid = (id: string, data: Partial<HorizontalGrid>) => {
    setGrids(prev => ({
      ...prev,
      horizontalZ: prev.horizontalZ.map(grid =>
        grid.id === id ? { ...grid, ...data } : grid
      ),
    }));
  };

  const addHorizontalZGrid = (grid: HorizontalGrid) => {
    setGrids(prev => ({
      ...prev,
      horizontalZ: [...prev.horizontalZ, grid],
    }));
  };

  const removeHorizontalZGrid = (id: string) => {
    setGrids(prev => ({
      ...prev,
      horizontalZ: prev.horizontalZ.filter(grid => grid.id !== id),
    }));
  };

  const updateFloorGrid = (id: string, data: Partial<FloorGrid>) => {
    setGrids(prev => ({
      ...prev,
      floors: prev.floors.map(grid =>
        grid.id === id ? { ...grid, ...data } : grid
      ),
    }));
  };

  const addFloorGrid = (grid: FloorGrid) => {
    setGrids(prev => ({
      ...prev,
      floors: [...prev.floors, grid],
    }));
  };

  const removeFloorGrid = (id: string) => {
    setGrids(prev => ({
      ...prev,
      floors: prev.floors.filter(grid => grid.id !== id),
    }));
  };

  return (
    <GridContext.Provider
      value={{
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
      }}
    >
      {children}
    </GridContext.Provider>
  );
};

export const useGrids = () => {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error('useGrids must be used within a GridProvider');
  }
  return context;
};
