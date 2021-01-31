import {
  AttributesFilterItemWithValues,
  FilterItemWithValues,
  FilterTypes
} from "@aboutyou/backbone/endpoints/filters/filters";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { FiltersContext, IFiltersCtx } from "../../context/FiltersContext";
import { FiltersPanel } from "../FiltersPanel";

const colorFilter = {
  id: 1,
  name: "Color",
  slug: "color",
  values: [
    {
      id: 1,
      name: "Black",
      value: "black",
      productCount: 0
    } as any,
    {
      id: 2,
      name: "White",
      value: "white",
      productCount: 0
    } as any
  ],
  type: FilterTypes.ATTRIBUTES
} as AttributesFilterItemWithValues;

const filters: FilterItemWithValues[] = [colorFilter];

const defaultCtxValue: IFiltersCtx = {
  filters,
  appliedFilters: {},
  isFilterPanelVisible: true,
  setFilterPanelVisiblity: () => {},
  update: () => {},
  reset: () => {},
  resetAll: () => {},
  applyFilters: () => {}
};

const footerTestIdPrefix = "filters-panel-footer";
const filterTestIdPrefix = `filter-${colorFilter.slug}`;

describe("<FiltersPanel />", () => {
  it("should render correctly", () => {
    const { getByTestId } = render(
      <FiltersContext.Provider value={defaultCtxValue}>
        <FiltersPanel />
      </FiltersContext.Provider>
    );

    expect(getByTestId(`${footerTestIdPrefix}__reset-all`)).toBeInTheDocument();
    expect(
      getByTestId(`${footerTestIdPrefix}__apply-filters`)
    ).toBeInTheDocument();
  });

  it("should call `update` callback, when filter changes", () => {
    const handleUpdate = jest.fn();
    const { getByText } = render(
      <FiltersContext.Provider
        value={{ ...defaultCtxValue, update: handleUpdate }}
      >
        <FiltersPanel />
      </FiltersContext.Provider>
    );

    fireEvent.click(getByText(/white/i));

    expect(handleUpdate).toBeCalledWith(
      colorFilter.id,
      colorFilter.values[1].id.toString()
    );
  });

  it("should call `reset` callback, when individual filter is being reset", () => {
    const handleReset = jest.fn();
    const { getByTestId } = render(
      <FiltersContext.Provider
        value={{ ...defaultCtxValue, reset: handleReset }}
      >
        <FiltersPanel />
      </FiltersContext.Provider>
    );

    fireEvent.click(getByTestId(`${filterTestIdPrefix}__reset`));

    expect(handleReset).toBeCalledWith(colorFilter.id);
  });

  it("should call `resetAll` callback, after click on `Reset` button", () => {
    const resetAll = jest.fn();
    const { getByTestId } = render(
      <FiltersContext.Provider value={{ ...defaultCtxValue, resetAll }}>
        <FiltersPanel />
      </FiltersContext.Provider>
    );

    fireEvent.click(getByTestId(`${footerTestIdPrefix}__reset-all`));

    expect(resetAll).toBeCalledTimes(1);
  });

  it("should call `applyFilters` callback, after click on `Apply` button", () => {
    const applyFilters = jest.fn();
    const { getByTestId } = render(
      <FiltersContext.Provider value={{ ...defaultCtxValue, applyFilters }}>
        <FiltersPanel />
      </FiltersContext.Provider>
    );

    fireEvent.click(getByTestId(`${footerTestIdPrefix}__apply-filters`));

    expect(applyFilters).toBeCalledTimes(1);
  });
});
