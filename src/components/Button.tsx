import styled, { css } from "styled-components";

type ButtonType = "primary" | "secondary" | "text";
type ButtonSize = "small" | "medium";

const baseBtnStyles = css`
  cursor: pointer;
  outline: none;
`;

const primaryBtn = css`
  background: #000;
  color: #fff;
  border: 0;
`;

const secondaryBtn = css`
  border: 1px solid #e5e5e5;
  background: #fff;
  transition: background linear 0.2s;

  &:hover {
    background: #fbfbfb;
  }
`;

const textBtn = css`
  background: transparent;
  border: 0;
`;

const typesMixins: Record<ButtonType, any> = {
  primary: primaryBtn,
  secondary: secondaryBtn,
  text: textBtn
};

const sizeMixins: Record<ButtonSize, any> = {
  small: css`
    padding: 0.5rem 1rem;
  `,
  medium: css`
    padding: 1rem 1.5rem;
  `
};

type ButtonProps = {
  buttonType?: ButtonType;
  size?: ButtonSize;
  elliptic?: boolean;
  rounded?: boolean;
};

export const Button = styled.button<ButtonProps>`
  ${baseBtnStyles}
  font-weight: bold;
  letter-spacing: 0.4px;
  ${({ buttonType = "primary" }) => typesMixins[buttonType]}
  ${({ size = "medium" }) => sizeMixins[size]}
  ${({ elliptic = false }) => elliptic && "border-radius: 1.5rem;"}
`;

type IconButtonProps = Pick<ButtonProps, "size" | "buttonType"> & {
  rounded?: boolean;
};

const iconSizeMixins: Record<ButtonSize, any> = {
  small: css`
    width: 1rem;
    height: 1rem;

    svg {
      width: 0.75rem;
      height: 0.75rem;
    }
  `,
  medium: `
    width: 1.5rem;
    height: 1.5rem;

    svg {
        width: 1rem;
        height: 1rem;
    }
  `
};

export const IconButton = styled.button<IconButtonProps>`
    display: flex;
    align-items:center;
    justify-content:center;
    ${baseBtnStyles}
    ${({ buttonType = "primary" }) => typesMixins[buttonType]}
    ${({ size = "medium" }) => iconSizeMixins[size]}
    ${({ rounded = false }) => rounded && "border-radius: 50%;"}
`;
