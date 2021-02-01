import { AttributeWithValuesFilter } from "@aboutyou/backbone/types/AttributeOrAttributeValueFilter";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { useProductLoader } from "../api/useProductLoader";
import { FiltersMap, Product } from "../types/types";
import { debounce, transformToAttributesWithValues } from "../utils/utils";

type RefreshFn = (filters: FiltersMap, force?: boolean) => void;

interface ProductsContextProviderProps {
  reFetchDelay?: number;
}

export interface ProductsCtx {
  products: Product[];
  refresh: RefreshFn;
}

export const ProductsContext = React.createContext<ProductsCtx>({
  products: [],
  refresh: () => {}
});

export const useProductCtx = () => useContext(ProductsContext);

export const ProductsContextProvider: React.FC<
  ProductsContextProviderProps
> = ({ children, reFetchDelay = 200 }) => {
  const [attributeFilters, setAttributeFilters] = useState<
    AttributeWithValuesFilter[]
  >([]);
  const products = useProductLoader(attributeFilters);

  const apply = useCallback((filters: FiltersMap) => {
    setAttributeFilters(transformToAttributesWithValues(filters));
  }, []);

  const debouncedApply = useMemo(() => debounce(apply, reFetchDelay), [
    apply,
    reFetchDelay
  ]);

  const refresh = useCallback(
    (filters: FiltersMap, force: boolean = false) => {
      const fn = force ? apply : debouncedApply;

      if (force) {
        debouncedApply.cancel();
      }

      fn(filters);
    },
    [apply, debouncedApply]
  );

  useEffect(() => {
    return () => {
      console.log("here");
      debouncedApply.cancel();
    };
  }, [debouncedApply]);

  return (
    <ProductsContext.Provider value={{ products, refresh }}>
      {children}
    </ProductsContext.Provider>
  );
};
