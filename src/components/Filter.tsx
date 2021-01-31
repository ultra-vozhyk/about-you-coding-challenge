import { AttributesFilterValue } from "@aboutyou/backbone/endpoints/filters/filters";
import React, { useCallback } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";

interface IFilterProps {
  id: number;
  name: string;
  title: string;
  values: AttributesFilterValue[];
  selectedOptions?: string[];
  onChange: (id: number, values: string) => void;
  onReset: (id: number) => void;
}

export const Filter: React.FC<IFilterProps> = ({
  id,
  name,
  title,
  values,
  selectedOptions = [],
  onChange,
  onReset
}) => {
  const testIdPrefix = `filter-${name}`;

  const handleChange = useCallback(
    (value: string) => {
      onChange(id, value);
    },
    [id]
  );

  const handleReset = () => {
    onReset(id);
  };

  const renderCheckbox = (el: AttributesFilterValue & { value?: string }) => {
    return (
      <MemoizedStyledCheckbox
        key={el.id}
        name={name}
        label={el.name}
        value={el.id.toString()}
        isChecked={selectedOptions.includes(el.id.toString())}
        checkboxStyle={el.value}
        onChange={handleChange}
      />
    );
  };

  return (
    <Wrapper data-testid={testIdPrefix}>
      <Header>
        <Title data-testid={`${testIdPrefix}__title`}>{title}</Title>
        <Button
          buttonType="text"
          size="small"
          onClick={handleReset}
          data-testid={`${testIdPrefix}__reset`}
        >
          Reset
        </Button>
      </Header>
      <Content data-testid={`${testIdPrefix}__items`}>
        {values.map(renderCheckbox)}
      </Content>
    </Wrapper>
  );
};

const StyledCheckbox = styled(Checkbox)`
  text-transform: capitalize;
  margin-bottom: 1.2rem;
`;

const MemoizedStyledCheckbox = React.memo(StyledCheckbox);

const Wrapper = styled.div`
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 0.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 2.5rem;

  ${StyledCheckbox} {
    flex: 50% 0 0;
  }
`;

const Title = styled.h3`
  font-weigt: bold;
`;
