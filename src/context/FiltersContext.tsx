import { FilterItemWithValues } from "@aboutyou/backbone/endpoints/filters/filters";
import React, { useCallback, useContext, useState } from "react";
import { useFilterLoader } from "../api/useFilterLoader";
import { FiltersMap } from "../types/types";
import { useProductCtx } from "./ProductsContext";

export interface IFiltersCtx {
  filters: FilterItemWithValues[];
  appliedFilters: Record<number, string[]>;
  isFilterPanelVisible: boolean;
  setFilterPanelVisiblity: (state: boolean) => void;
  update: (id: number, value: string) => void;
  reset: (id: number) => void;
  resetAll: () => void;
  applyFilters: () => void;
}

export const FiltersContext = React.createContext<IFiltersCtx>({
  filters: [],
  appliedFilters: {},
  isFilterPanelVisible: false,
  setFilterPanelVisiblity: () => {},
  update: () => {},
  reset: () => {},
  resetAll: () => {},
  applyFilters: () => {}
});

export const useFiltersCtx = () => useContext(FiltersContext);

export const FiltersContextProvider: React.FC = ({ children }) => {
  const filters = useFilterLoader();
  const { refresh } = useProductCtx();
  const [appliedFilters, setAppliedFilters] = useState<FiltersMap>({});
  const [isFilterPanelVisible, setFilterPanelVisiblity] = useState(false);

  const update = useCallback((id: number, value: string) => {
    setAppliedFilters(state => {
      const selection: string[] = state[id] || [];
      const newSelection = selection.includes(value)
        ? selection.filter(el => el !== value)
        : [...selection, value];
      const newState = { ...state };

      if (!newSelection.length) {
        delete newState[id];
      } else {
        newState[id] = newSelection;
      }

      refresh(newState);

      return newState;
    });
  }, []);

  const reset = useCallback((id: number) => {
    setAppliedFilters(state => {
      const newState = { ...state };

      delete newState[id];

      refresh(newState);

      return newState;
    });
  }, []);

  const resetAll = useCallback(() => {
    setAppliedFilters({});
    setFilterPanelVisiblity(false);

    refresh({}, true);
  }, [refresh]);

  const applyFilters = useCallback(() => {
    setFilterPanelVisiblity(false);

    refresh(appliedFilters, true);
  }, [appliedFilters, refresh]);

  const ctxValue = {
    filters,
    appliedFilters,
    isFilterPanelVisible,
    setFilterPanelVisiblity,
    update,
    reset,
    resetAll,
    applyFilters
  };

  return (
    <FiltersContext.Provider value={ctxValue}>
      {children}
    </FiltersContext.Provider>
  );
};
