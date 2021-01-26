import { act, renderHook } from "@testing-library/react-hooks";
import { useAsyncLoader } from "../useAsyncLoader";

describe("useAsyncLoader hook", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it("should return data for resolved promise", async () => {
    const resolvedValue = true;

    const { result, waitForNextUpdate } = renderHook(() =>
      useAsyncLoader(
        () =>
          new Promise(res => {
            setTimeout(() => {
              res(resolvedValue);
            }, 200);
          })
      )
    );

    act(() => {
      jest.runAllTimers();
    });

    await waitForNextUpdate();

    expect(result.current).toBe(resolvedValue);
  });

  it("should return error for rejected promise", async () => {
    const errorMsg = "Error occured";

    const { result, waitForNextUpdate } = renderHook(() =>
      useAsyncLoader(
        () =>
          new Promise((_, rej) => {
            setTimeout(() => {
              rej(errorMsg);
            }, 200);
          })
      )
    );

    act(() => {
      jest.runAllTimers();
    });

    await waitForNextUpdate();

    expect(result.current).toBe(errorMsg);
  });
});
