import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Checkbox } from "../Checkbox";

const baseProps = {
  name: "name",
  label: "Test label",
  value: "value"
};

const testIdPrefix = `checkbox-${baseProps.name}-${baseProps.value}`;

describe("<Checkbox />", () => {
  it("should render correctly, when checked", () => {
    const { getByText, getByTestId } = render(
      <Checkbox {...baseProps} isChecked={true} onChange={() => {}} />
    );

    expect(getByText(baseProps.label)).toBeInTheDocument();
    expect(getByTestId(testIdPrefix)).toBeInTheDocument();
    expect(getByTestId(`${testIdPrefix}__box`)).toBeInTheDocument();
    expect(getByTestId(`${testIdPrefix}__mark`)).toBeVisible();
    expect(getByTestId(`${testIdPrefix}__input`)).not.toBeVisible();
  });

  it("should call `onChange`, when checkbox changes state", () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <Checkbox {...baseProps} isChecked={false} onChange={handleChange} />
    );

    expect(getByTestId(`${testIdPrefix}__mark`)).not.toBeVisible();

    fireEvent.click(getByTestId(testIdPrefix));

    expect(handleChange).toBeCalledWith(baseProps.value);
  });
});
