import {
  FilterItemWithValues,
  FilterTypes
} from "@aboutyou/backbone/endpoints/filters/filters";
import React from "react";
import styled from "styled-components";
import { useFiltersCtx } from "../context/FiltersContext";
import { Button } from "./Button";
import { Filter } from "./Filter";
import { SidePanel } from "./SidePanel";

const MemoizedFilter = React.memo(Filter);

export const FiltersPanel: React.FC = () => {
  const {
    appliedFilters,
    isFilterPanelVisible,
    filters,
    setFilterPanelVisiblity,
    update,
    reset,
    resetAll,
    applyFilters
  } = useFiltersCtx();

  const handleClose = () => {
    setFilterPanelVisiblity(false);
  };

  const renderFilter = (filter: FilterItemWithValues) => {
    switch (filter.type) {
      case FilterTypes.ATTRIBUTES:
        return (
          <MemoizedFilter
            id={filter.id}
            key={filter.slug}
            name={filter.slug}
            title={filter.name}
            values={filter.values}
            selectedOptions={appliedFilters[filter.id.toString()]}
            onChange={update}
            onReset={reset}
          />
        );
    }

    return null;
  };

  return (
    <SidePanel
      isVisible={isFilterPanelVisible}
      title="Filters"
      onClose={handleClose}
      footer={
        <Actions>
          <Button buttonType="secondary" onClick={resetAll}>
            Reset
          </Button>
          <Button onClick={applyFilters}>Search</Button>
        </Actions>
      }
    >
      {filters.map(renderFilter)}
    </SidePanel>
  );
};

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;
