import React from "react";
import styled, { css } from "styled-components";
import { colors, gradients } from "../utils/constants";

interface ICheckboxProps {
  name: string;
  value: string;
  label: React.ReactNode;
  isChecked: boolean;
  checkboxStyle?: string;
  onChange: (value: string) => void;
}

export const Checkbox: React.FC<ICheckboxProps> = ({
  label,
  name,
  value,
  isChecked,
  checkboxStyle,
  onChange,
  ...rest
}) => {
  return (
    <Wrapper isActive={isChecked} {...rest}>
      <FakeCheckbox isActive={isChecked} checkboxStyle={checkboxStyle}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="none"
            stroke={
              !checkboxStyle ||
              (!colors[checkboxStyle] && !gradients[checkboxStyle])
                ? "black"
                : "white"
            }
            strokeWidth="4px"
            d="M1.73,12.91 8.1,19.28 22.79,4.59"
          ></path>
        </svg>
      </FakeCheckbox>
      <Input
        type="checkbox"
        name={name}
        value={value}
        checked={isChecked}
        onChange={() => onChange(value)}
      />
      {label}
    </Wrapper>
  );
};

const coloredBoxMixin = css<{ checkboxStyle: string }>`
  background: ${p => colors[p.checkboxStyle]};
  box-shadow: ${p => `${colors[p.checkboxStyle]} 0px 0px 0px 2px inset`};
`;

const defaultBoxMixin = css`
  background: #ffffff;
  box-shadow: #9e9e9e 0px 0px 0px 2px inset;
`;

const boxColorMixin = css<{ checkboxStyle: string }>`
  ${p => (colors[p.checkboxStyle] ? coloredBoxMixin : "")}
  ${p =>
    gradients[p.checkboxStyle]
      ? `background: ${gradients[p.checkboxStyle]};`
      : ""}
  ${p =>
    !colors[p.checkboxStyle] && !gradients[p.checkboxStyle]
      ? defaultBoxMixin
      : ""}
`;

const Wrapper = styled.label<{ isActive: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 500;
  ${p => (!p.isActive ? "color: #9b9b9b;" : "")}
`;

const Input = styled.input`
  display: none;
`;

const FakeCheckbox = styled.div<{ isActive: boolean; checkboxStyle: string }>`
  display: block;
  margin-right: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 3px;
  text-align: center;
  line-height: 1.5rem;
  ${boxColorMixin}

  svg {
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  }
`;
