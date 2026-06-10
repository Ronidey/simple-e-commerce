import FILTERS from "../constants/filters";

export default function parseFilters(searchParams: URLSearchParams) {
  return {
    page: Number(searchParams.get(FILTERS.PAGE)) || 1,
    category: searchParams.get(FILTERS.CATEGORY),
    brand: searchParams.get(FILTERS.BRAND)?.split(",") || [],
    minPrice: Number(searchParams.get(FILTERS.MIN_PRICE)) || 0,
    maxPrice: Number(searchParams.get(FILTERS.MAX_PRICE)) || 0,
  };
}

export type ProductFilters = ReturnType<typeof parseFilters>;
