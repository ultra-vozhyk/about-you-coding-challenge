import { useCallback } from "react";
import { execute } from "@aboutyou/backbone/helpers/execute";
import {
  APISortOrder,
  createProductsSearchEndpointRequest
} from "@aboutyou/backbone/endpoints/products/products";
import { useAsyncLoader } from "./useAsyncLoader";
import { normalizeProduct } from "./normalizeProduct";
import { API_ENDPOINT, CATEGORY_ID, SHOP_ID } from "../utils/constants";
import { ProductSearchQuery } from "@aboutyou/backbone/types/ProductSearchQuery";

export const useProductLoader = (
  attributes?: ProductSearchQuery["attributes"]
) => {
  const products = useAsyncLoader(
    useCallback(
      () =>
        execute(
          API_ENDPOINT,
          SHOP_ID,
          createProductsSearchEndpointRequest({
            where: {
              categoryId: CATEGORY_ID,
              attributes
            },
            pagination: {
              page: 1,
              perPage: 50
            },
            sort: {
              channel: "etkp",
              direction: APISortOrder.Descending,
              score: "category_scores"
            },
            with: {
              attributes: {
                withKey: ["brand"]
              },
              priceRange: true
            }
          })
        ).then(({ data }) => data.entities.map(normalizeProduct)),
      [attributes]
    )
  );

  return Array.isArray(products) ? products : [];
};
