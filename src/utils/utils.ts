import { AttributeWithValuesFilter } from "@aboutyou/backbone/types/AttributeOrAttributeValueFilter";
import { FiltersMap } from "../types/types";

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
