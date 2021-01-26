import { renderHook } from "@testing-library/react-hooks";
import { useFilterLoader } from "../useFilterLoader";
import {
  AttributesFilterItemWithValues,
  BooleanFilterItemWithValues,
  FilterTypes
} from "@aboutyou/backbone/endpoints/filters/filters";
import * as executeHelpers from "@aboutyou/backbone/helpers/execute";

const colorFilter: AttributesFilterItemWithValues = {
  id: 1,
  slug: "color",
  name: "Color",
  values: [],
  type: FilterTypes.ATTRIBUTES
};

const patternFilter: AttributesFilterItemWithValues = {
  id: 2,
  slug: "pattern",
  name: "Pattern",
  values: [],
  type: FilterTypes.ATTRIBUTES
};

const booleanFilter: BooleanFilterItemWithValues = {
  id: null,
  slug: "boolean_filter",
  name: "Boolean filter",
  values: [],
  type: FilterTypes.BOOLEAN
};

jest.mock("@aboutyou/backbone/helpers/execute");

describe("useFilterLoader hook", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it("should return `color` and `pattern` filters when they exists in response", async () => {
    jest.spyOn(executeHelpers, "execute").mockReturnValueOnce(
      new Promise(resolve => {
        resolve({
          url: "",
          data: [colorFilter, patternFilter, booleanFilter],
          statusCode: 200,
          headers: {}
        });
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useFilterLoader());

    await waitForNextUpdate();

    expect(result.current).toEqual([colorFilter, patternFilter]);
  });

  it("should return empty array when there are no `color` and `pattern` filters in response", async () => {
    jest.spyOn(executeHelpers, "execute").mockReturnValueOnce(
      new Promise(resolve => {
        resolve({
          url: "",
          data: [booleanFilter],
          statusCode: 200,
          headers: {}
        });
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useFilterLoader());

    await waitForNextUpdate();

    expect(result.current).toEqual([]);
  });
});
