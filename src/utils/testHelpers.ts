import {
  FilterTypes,
  AttributesFilterItemWithValues
} from "@aboutyou/backbone/endpoints/filters/filters";

export const mockedColorFilter = {
  id: 1,
  name: "Color",
  slug: "color",
  values: [
    {
      id: 1,
      name: "Black",
      value: "black",
      productCount: 0
    } as any,
    {
      id: 2,
      name: "White",
      value: "white",
      productCount: 0
    } as any
  ],
  type: FilterTypes.ATTRIBUTES
} as AttributesFilterItemWithValues;

export const mockedPatternFilter = {
  id: 2,
  name: "Pattern",
  slug: "pattern",
  values: [
    {
      id: 3,
      name: "Logo print",
      value: "logo_print",
      productCount: 0
    } as any,
    {
      id: 4,
      name: "Animal print",
      value: "animal_print",
      productCount: 0
    } as any
  ],
  type: FilterTypes.ATTRIBUTES
} as AttributesFilterItemWithValues;

export const mockedFilterList = [mockedColorFilter, mockedPatternFilter];
