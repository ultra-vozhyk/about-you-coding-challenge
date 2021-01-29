export interface Product {
  id: number;
  image: string | null;
  name: string;
  price?: string;
}

export type FiltersMap = Record<number, string[]>;
