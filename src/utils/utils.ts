import { AttributeWithValuesFilter } from "@aboutyou/backbone/types/AttributeOrAttributeValueFilter";
import { FiltersMap } from "../types/types";

export const debounce = <F extends (...args: any[]) => void>(
  fn: F,
  delay: number
) => {
  let timeout: any = undefined;

  const cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
  };

  const debounced = (...args: Parameters<F>) => {
    cancel();

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  debounced.cancel = cancel;

  return debounced;
};

export const transformToAttributesWithValues = (filtersMap: FiltersMap) =>
  Object.keys(filtersMap).reduce<AttributeWithValuesFilter[]>(
    (aggr, key) => [
      ...aggr,
      {
        id: +key,
        type: "attributes",
        values: filtersMap[key]
      }
    ],
    []
  );
