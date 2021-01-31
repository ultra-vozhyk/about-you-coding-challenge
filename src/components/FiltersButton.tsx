import React from "react";
import styled from "styled-components";
import { useFiltersCtx } from "../context/FiltersContext";
import { Button } from "./Button";

interface IFilterButtonProps {
  text: string;
}

export const FiltersButton: React.FC<IFilterButtonProps> = ({ text }) => {
  const { appliedFilters, setFilterPanelVisiblity } = useFiltersCtx();
  const filtersCount = Object.keys(appliedFilters).length;

  return (
    <Wrapper>
      <Button
        buttonType="secondary"
        size="small"
        elliptic={true}
        onClick={() => {
          setFilterPanelVisiblity(true);
        }}
      >
        {text}
        {filtersCount > 0 && <Counter>({filtersCount})</Counter>}
      </Button>
    </Wrapper>
  );
};

const Counter = styled.span`
  margin-left: 0.3rem;
`;

const Wrapper = styled.div`
  position: relative;
  top: 2px;
  float: right;
`;
