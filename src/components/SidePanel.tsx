import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import { IconButton } from "./Button";

interface Visibility {
  isVisible: boolean;
}

interface ISidePanelProps extends Visibility {
  isVisible: boolean;
  title: string;
  footer?: ReactNode;
  onClose: () => void;
}

export const SidePanel: React.FC<ISidePanelProps> = ({
  isVisible,
  title,
  children,
  footer,
  onClose
}) => {
  return (
    <>
      <Wrapper isVisible={isVisible}>
        <Header>
          <Title>{title}</Title>
          <IconButton buttonType="secondary" rounded={true} onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path clipRule="evenodd" fill="none" d="M0 0h24v24H0z"></path>
              <path d="M7.697 6.167L7.53 6 6 7.53 10.47 12l-4.303 4.303L6 16.47 7.53 18 12 13.53l4.302 4.303.167.167L18 16.47 13.53 12 18 7.53 16.47 6 12 10.47 7.697 6.167z"></path>
            </svg>
          </IconButton>
        </Header>
        <Content>{children}</Content>
        {footer && <Footer>{footer}</Footer>}
      </Wrapper>
      <Overlay isVisible={isVisible} onClick={onClose} />
    </>
  );
};

const visibilityMixin = css<Visibility>`
  transform: translateX(${p => (p.isVisible ? "0%" : "100%")});
`;

const Overlay = styled.div<Visibility>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
  ${visibilityMixin}
`;

const Wrapper = styled.div<Visibility>`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  width: 100%;
  max-width: 420px;
  z-index: 2;
  transition: transform linear 0.2s;
  ${visibilityMixin}
`;

const Header = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 10px 15px 0px,
    rgba(0, 0, 0, 0.05) 0px 2px 2px 0px;
`;

const Content = styled.div`
  flex: auto 1 1;
  background: #f5f5f5;
  overflow: auto;
`;

const Footer = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  flex: 1;
  padding-right: 1rem;
`;
