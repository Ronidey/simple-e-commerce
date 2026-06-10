import type { Product, ProductCategory } from "../types/product";

type ProductsResponse = {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
};

export const PRODUCTS_LIMIT = 10;

type FetchProductsProps = {
  page: number;
  category: string | null;
};

export const fetchProducts = async ({
  page,
  category,
}: FetchProductsProps): Promise<ProductsResponse> => {
  let url = "https://dummyjson.com/products";

  if (category) url += `/category/${category}`;

  const params = new URLSearchParams();

  params.set("skip", String((page - 1) * PRODUCTS_LIMIT));
  params.set("limit", String(PRODUCTS_LIMIT));

  const res = await fetch(`${url}?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch products!");
  }

  return await res.json();
};

export const fetchProductCategories = async (): Promise<ProductCategory[]> => {
  const res = await fetch("https://dummyjson.com/products/categories");

  if (!res.ok) {
    throw new Error("Failed to fetch product categories!");
  }

  return await res.json();
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);

  if (!res.ok) {
    throw new Error("Invalid product ID!");
  }

  const product = await res.json();

  return product;
};
