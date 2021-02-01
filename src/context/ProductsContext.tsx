import { AttributeWithValuesFilter } from "@aboutyou/backbone/types/AttributeOrAttributeValueFilter";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { useProductLoader } from "../api/useProductLoader";
import { FiltersMap, Product } from "../types/types";
import { transformToAttributesWithValues } from "../utils/utils";

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
  const [lastAppliedFilters, setLastAppliedFilters] = useState<
    AttributeWithValuesFilter[]
  >([]);
  const [scheduledUpdate, setScheduledUpdate] = useState<{
    filters: AttributeWithValuesFilter[];
    force: boolean;
  }>(null);
  const delay = useRef<number>();
  const products = useProductLoader(lastAppliedFilters);

  const forceRefetch = useCallback((filters: AttributeWithValuesFilter[]) => {
    setLastAppliedFilters(filters);
    setScheduledUpdate(null);
  }, []);

  const refresh = useCallback((filters: FiltersMap, force: boolean = false) => {
    setScheduledUpdate({
      filters: transformToAttributesWithValues(filters),
      force
    });
  }, []);

  useEffect(() => {
    let mounted = true;

    if (scheduledUpdate && scheduledUpdate.filters !== lastAppliedFilters) {
      if (delay.current) {
        clearTimeout(delay.current);
      }

      if (scheduledUpdate.force) {
        forceRefetch(scheduledUpdate.filters);
      } else {
        delay.current = setTimeout(() => {
          if (mounted) {
            forceRefetch(scheduledUpdate.filters);
          }
        }, reFetchDelay);
      }
    }

    return () => {
      mounted = false;
    };
  }, [scheduledUpdate, lastAppliedFilters, reFetchDelay]);

  return (
    <ProductsContext.Provider value={{ products, refresh }}>
      {children}
    </ProductsContext.Provider>
  );
};
