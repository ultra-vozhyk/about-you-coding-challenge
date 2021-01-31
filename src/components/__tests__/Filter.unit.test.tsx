import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Filter } from "../Filter";

const baseProps = {
  id: 1,
  name: "color",
  title: "Color Filter",
  values: [
    {
      id: 1,
      name: "white",
      productCount: 0,
      value: "white"
    },
    {
      id: 2,
      name: "black",
      productCount: 0,
      value: "black"
    }
  ]
};

const testIdPrefix = `filter-${baseProps.name}`;

describe("<Filter />", () => {
  it("should render correctly", () => {
    const { container, getByTestId } = render(
      <Filter
        {...baseProps}
        selectedOptions={[]}
        onChange={() => {}}
        onReset={() => {}}
      />
    );

    const checkboxes = container.querySelectorAll("input[type=checkbox]");

    expect(getByTestId(`${testIdPrefix}__title`)).toHaveTextContent(
      baseProps.title
    );
    expect(getByTestId(`${testIdPrefix}__reset`)).toBeInTheDocument();
    expect(getByTestId(`${testIdPrefix}__items`)).toBeInTheDocument();
    expect(checkboxes.length).toBe(2);
  });

  it("should render correctly, when `selectedOptions` is not empty", () => {
    const { container } = render(
      <Filter
        {...baseProps}
        selectedOptions={["1"]}
        onChange={() => {}}
        onReset={() => {}}
      />
    );

    const activeCheckboxes = container.querySelectorAll(
      "input[type=checkbox]:checked"
    );

    expect(activeCheckboxes.length).toBe(1);
  });

  it("should call `onReset` callback, after reset button clicked", () => {
    const handleReset = jest.fn();

    const { getByTestId } = render(
      <Filter
        {...baseProps}
        selectedOptions={[]}
        onChange={() => {}}
        onReset={handleReset}
      />
    );

    fireEvent.click(getByTestId(`${testIdPrefix}__reset`));

    expect(handleReset).toBeCalledWith(baseProps.id);
  });

  it("should call `onChange` callback, after checkbox click", () => {
    const optionId = baseProps.values[1].id;
    const handleChange = jest.fn();

    const { getByTestId } = render(
      <Filter
        {...baseProps}
        selectedOptions={[]}
        onChange={handleChange}
        onReset={() => {}}
      />
    );

    const checkbox = getByTestId(`${testIdPrefix}__items`).querySelector(
      `input[value="${optionId}"]`
    );

    fireEvent.click(checkbox);

    expect(handleChange).toBeCalledWith(baseProps.id, optionId.toString());
  });
});
