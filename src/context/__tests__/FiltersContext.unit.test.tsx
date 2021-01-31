import { renderHook } from "@testing-library/react-hooks";
import React, { useContext } from "react";
import { FiltersContext, FiltersContextProvider } from "../FiltersContext";
import * as filtersApi from "../../api/useFilterLoader";
import { mockedFilterList } from "../../utils/testHelpers";
import { act } from "@testing-library/react";
import { ProductsContext } from "../ProductsContext";

jest.mock("../../api/useFilterLoader");

const renderWrappedHook = () => {
  const mockedRefresh = jest.fn();

  const wrapper = ({ children }) => (
    <ProductsContext.Provider value={{ products: [], refresh: mockedRefresh }}>
      <FiltersContextProvider>{children}</FiltersContextProvider>
    </ProductsContext.Provider>
  );

  const renderResult = renderHook(() => useContext(FiltersContext), {
    wrapper
  });

  return {
    mockedRefresh,
    renderResult
  };
};

describe("<FiltersContext />", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should return correct filters", () => {
    jest
      .spyOn(filtersApi, "useFilterLoader")
      .mockImplementation(() => mockedFilterList);

    const wrapper = ({ children }) => (
      <FiltersContextProvider>{children}</FiltersContextProvider>
    );
    const { result } = renderHook(() => useContext(FiltersContext), {
      wrapper
    });

    expect(result.current.filters).toEqual(mockedFilterList);
  });

  it("should set `isFilterPanelVisibility` flag based on value provided in `setFilterPanelVisiblity`", () => {
    const {
      renderResult: { result }
    } = renderWrappedHook();

    act(() => {
      result.current.setFilterPanelVisiblity(true);
    });

    expect(result.current.isFilterPanelVisible).toBe(true);
  });

  it("should change `appliedFilters` according to the `update` fn call and invoke `refresh` fn from `<ProductsContext />`", () => {
    const {
      renderResult: { result },
      mockedRefresh
    } = renderWrappedHook();

    act(() => {
      result.current.update(5, "test_value");

      jest.runOnlyPendingTimers();
    });

    expect(result.current.appliedFilters).toEqual({ 5: ["test_value"] });

    act(() => {
      result.current.update(5, "test_value");

      jest.runOnlyPendingTimers();
    });

    expect(result.current.appliedFilters).toEqual({});

    expect(mockedRefresh).toBeCalledTimes(2);
  });

  it("should change `appliedFilters` according to the `reset` fn call and invoke `refresh` fn from `<ProductsContext />`", () => {
    const {
      renderResult: { result },
      mockedRefresh
    } = renderWrappedHook();

    act(() => {
      result.current.update(5, "test_value");
      result.current.update(15, "test_value_2");
      result.current.reset(5);
    });

    expect(mockedRefresh).lastCalledWith({ 15: ["test_value_2"] });
  });

  it("should change `appliedFilters` according to the `resetAll` fn call and invoke `refresh` fn from `<ProductsContext />`", () => {
    const {
      renderResult: { result },
      mockedRefresh
    } = renderWrappedHook();

    act(() => {
      result.current.update(5, "test_value");
      result.current.update(15, "test_value_2");
    });

    act(() => {
      result.current.resetAll();
    });

    expect(mockedRefresh).lastCalledWith({}, true);
  });

  it("should call `refresh` fn from `<ProductsContext />`, when `applyFilters` is called", () => {
    const {
      renderResult: { result },
      mockedRefresh
    } = renderWrappedHook();

    act(() => {
      result.current.update(5, "test_value");
      result.current.update(15, "test_value_2");
    });

    act(() => {
      result.current.applyFilters();
    });

    expect(result.current.isFilterPanelVisible).toBe(false);

    expect(mockedRefresh).lastCalledWith(
      { 5: ["test_value"], 15: ["test_value_2"] },
      true
    );
  });
});
