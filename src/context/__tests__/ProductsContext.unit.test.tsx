import React from "react";
import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useContext } from "react";
import { ProductsContext, ProductsContextProvider } from "../ProductsContext";
import * as productsApi from "../../api/useProductLoader";
import { transformToAttributesWithValues } from "../../utils/utils";
import { Product } from "../../types/types";

jest.mock("../../api/useProductLoader");

const filtersMap = {
  12: ["25", "67"]
};

const products: Product[] = [
  {
    id: 1,
    image: null,
    name: "Product test",
    price: "200"
  }
];

const filterAttributes = transformToAttributesWithValues(filtersMap);

const renderWrappedHook = () => {
  const wrapper = ({ children }) => (
    <ProductsContextProvider>{children}</ProductsContextProvider>
  );

  return renderHook(() => useContext(ProductsContext), {
    wrapper
  });
};

describe("<ProductsContext />", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should return correct product list", () => {
    jest
      .spyOn(productsApi, "useProductLoader")
      .mockImplementation(() => products);

    const { result } = renderWrappedHook();

    expect(result.current.products).toEqual(products);
  });

  it("should call `refresh` with delay", async () => {
    jest.spyOn(productsApi, "useProductLoader").mockImplementation(() => []);

    const { result } = renderWrappedHook();

    act(() => {
      result.current.refresh(filtersMap);
    });

    expect(productsApi.useProductLoader).toBeCalledWith([]);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(productsApi.useProductLoader).toBeCalledWith(filterAttributes);
  });

  it("should call `refresh` without delay and cancel debounced calls, if `force` parameter is provided", () => {
    jest.spyOn(productsApi, "useProductLoader").mockImplementation(() => []);

    const { result } = renderWrappedHook();

    act(() => {
      result.current.refresh(filtersMap);

      jest.runTimersToTime(100);

      result.current.refresh({}, true);
    });

    expect(productsApi.useProductLoader).toBeCalledWith([]);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(productsApi.useProductLoader).toBeCalledWith([]);
  });
});
