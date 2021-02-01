import React from "react";
import yakbak from "yakbak";
import http from "http";
import App from "../components/App";
import { act, fireEvent, render } from "@testing-library/react";

const wait = (timeout: number = 0) =>
  new Promise(resolve => setTimeout(resolve, timeout));

describe("App", () => {
  let server: http.Server;

  beforeAll(() => {
    server = http
      .createServer(
        yakbak("https://api-cloud.aboutyou.de", {
          dirname: __dirname + "/tapes"
        })
      )
      .listen(process.env.PORT || 9459);
  });

  afterAll(done => server.close(done));

  it("should render logo in the header", () => {
    const { queryByText } = render(<App />);
    expect(queryByText("ABOUT YOU")).toBeDefined();
  });

  it("should render products as soon as they are fetched", async () => {
    const { findAllByTestId } = render(<App />);
    expect((await findAllByTestId("ProductTile")).length).toBe(50);
  });

  it("should show filters panel, after click on `Filters` button", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId("open-filters-btn"));

    expect(getByTestId("sidepanel")).toHaveStyle({
      transform: "translateX(0%)"
    });
  });

  it("should show correct number of filter items", async () => {
    const { findByTestId } = render(<App />);

    const colorFilter = await findByTestId("filter-color__items");
    expect(colorFilter.querySelectorAll("label").length).toBe(14);

    const patternFilter = await findByTestId("filter-pattern__items");
    expect(patternFilter.querySelectorAll("label").length).toBe(17);
  });

  it("should update product list automatically, after applying a filter", async () => {
    const { findByTestId, findAllByTestId } = render(<App />);

    await act(async () => {
      fireEvent.click(await findByTestId("checkbox-color-38928"));
      fireEvent.click(await findByTestId("checkbox-pattern-35458"));

      await wait(1000);
    });

    expect((await findAllByTestId("ProductTile")).length).toBe(12);
  });

  it("should reset individual filter, after click on `Reset` button", async () => {
    const { findAllByTestId, findByTestId, getByTestId } = render(<App />);

    await act(async () => {
      fireEvent.click(await findByTestId("checkbox-color-38928"));
      fireEvent.click(await findByTestId("checkbox-pattern-35458"));

      await wait(1000);
    });

    expect((await findAllByTestId("ProductTile")).length).toBe(12);

    await act(async () => {
      fireEvent.click(getByTestId("filter-color__reset"));

      await wait(1000);
    });

    expect((await findAllByTestId("ProductTile")).length).toBe(50);
  });

  it("should reset all filters, after click on `Reset all` button", async () => {
    const { findAllByTestId, findByTestId, getByTestId } = render(<App />);

    await act(async () => {
      fireEvent.click(await findByTestId("checkbox-pattern-35254"));

      await wait(1000);
    });

    expect((await findAllByTestId("ProductTile")).length).toBe(1);

    await act(async () => {
      fireEvent.click(getByTestId("filters-panel-footer__reset-all"));

      await wait(1000);
    });

    expect((await findAllByTestId("ProductTile")).length).toBe(50);
  });

  it("should apply filters, after click on `Search` button", async () => {
    const { findAllByTestId, findByTestId, getByTestId } = render(<App />);

    await act(async () => {
      fireEvent.click(await findByTestId("checkbox-pattern-35254"));
    });

    act(() => {
      fireEvent.click(getByTestId("filters-panel-footer__apply-filters"));
    });

    expect((await findAllByTestId("ProductTile")).length).toBe(1);
  });
});
