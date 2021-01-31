import { debounce, transformToAttributesWithValues } from "../utils";

describe("`debounce` fn tests", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it("should invoke function with delay", () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 200);

    debouncedFn();

    expect(fn).not.toBeCalled();

    jest.runTimersToTime(100);

    expect(fn).not.toBeCalled();

    jest.runTimersToTime(100);

    expect(fn).toBeCalledTimes(1);
  });

  it("should cancel function invocation", () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 200);

    debouncedFn();

    jest.runTimersToTime(100);

    debouncedFn.cancel();

    jest.runOnlyPendingTimers();

    expect(fn).toBeCalledTimes(0);
  });
});

describe("`transformToAttributesWithValues` fn tests", () => {
  it("should return correct result", () => {
    const filtersMap = {
      1: ["25, 74"],
      2: ["45", "67"]
    };

    const expectedValue = [
      {
        id: 1,
        type: "attributes",
        values: filtersMap[1]
      },
      {
        id: 2,
        type: "attributes",
        values: filtersMap[2]
      }
    ];

    expect(transformToAttributesWithValues(filtersMap)).toEqual(expectedValue);
  });
});
