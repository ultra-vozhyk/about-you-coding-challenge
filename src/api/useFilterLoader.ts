import { createFiltersEndpointRequest } from "@aboutyou/backbone/endpoints/filters/filters";
import { execute } from "@aboutyou/backbone/helpers/execute";
import { useCallback } from "react";
import { API_ENDPOINT, CATEGORY_ID, SHOP_ID } from "../utils/constants";
import { useAsyncLoader } from "./useAsyncLoader";

const filterKeys = ["color", "pattern"];

export const useFilterLoader = () => {
  const filters = useAsyncLoader(
    useCallback(
      () =>
        execute(
          API_ENDPOINT,
          SHOP_ID,
          createFiltersEndpointRequest({
            where: {
              categoryId: CATEGORY_ID
            },
            with: ["values"]
          })
        ).then(({ data }) => data.filter(el => filterKeys.includes(el.slug))),
      []
    )
  );

  return Array.isArray(filters) ? filters : [];
};
