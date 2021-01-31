import React from "react";

import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";
import ProductStream from "./ProductStream";
import { FiltersContextProvider } from "../context/FiltersContext";
import { ProductsContextProvider } from "../context/ProductsContext";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ProductsContextProvider>
        <FiltersContextProvider>
          <Header />
          <Layout>
            <ProductStream />
          </Layout>
        </FiltersContextProvider>
      </ProductsContextProvider>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
  }
`;

const Layout = styled.article`
  padding: 0 20px;
`;

export default App;
