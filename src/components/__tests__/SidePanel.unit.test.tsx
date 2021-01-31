import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { SidePanel } from "../SidePanel";

const baseProps = {
  title: "Header title"
};

const testIdPrefix = "sidepanel";

describe("<SidePanel />", () => {
  it("should render correctly, when visible", () => {
    const sidePanelText = "Test content";
    const { getByTestId } = render(
      <SidePanel {...baseProps} isVisible={true} onClose={() => {}}>
        <>{sidePanelText}</>
      </SidePanel>
    );

    expect(getByTestId(testIdPrefix)).toBeVisible();
    expect(getByTestId(testIdPrefix)).toBeVisible();
    expect(getByTestId(`${testIdPrefix}__title`)).toHaveTextContent(
      baseProps.title
    );
    expect(getByTestId(`${testIdPrefix}__content`)).toHaveTextContent(
      sidePanelText
    );
  });

  it("should render correctly, when invisible", () => {
    const { getByTestId } = render(
      <SidePanel {...baseProps} isVisible={false} onClose={() => {}} />
    );

    expect(getByTestId(testIdPrefix)).toHaveStyle({
      transform: "translateX(100%)"
    });
    expect(getByTestId(testIdPrefix)).toHaveStyle({
      transform: "translateX(100%)"
    });
  });

  it("should call `onClose` callback, after click on close button", () => {
    const handleClose = jest.fn();
    const { getByTestId } = render(
      <SidePanel {...baseProps} isVisible={true} onClose={handleClose} />
    );

    fireEvent.click(getByTestId(`${testIdPrefix}__close`));

    expect(handleClose).toBeCalledTimes(1);
  });

  it("should call `onClose` callback, after click on overlay", () => {
    const handleClose = jest.fn();
    const { getByTestId } = render(
      <SidePanel {...baseProps} isVisible={true} onClose={handleClose} />
    );

    fireEvent.click(getByTestId(`${testIdPrefix}-overlay`));

    expect(handleClose).toBeCalledTimes(1);
  });
});
