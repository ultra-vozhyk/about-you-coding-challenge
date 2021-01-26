import React from "react";

import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";
import ProductStream from "./ProductStream";
import { useProductLoader } from "../api/useProductLoader";
import { useFilterLoader } from "../api/useFilterLoader";
import FiltersPanel from "./FiltersPanel";

const App = () => {
  const products = useProductLoader();
  const filters = useFilterLoader();

  return (
    <>
      <GlobalStyle />
      <Header>
        <FiltersPanel filters={filters} />
      </Header>
      <Layout>
        <ProductStream products={products} />
      </Layout>
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
  }
`;

const Layout = styled.article`
  padding: 0 20px;
`;

export default App;
