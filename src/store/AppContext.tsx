import { createContext, useContext, type Dispatch } from "react";
import type { Product, ProductCategory } from "../types/product";

export type State = {
  isSidebarOpen: boolean;
  products: {
    loading: boolean;
    data: Product[];
    total: number;
    error: null | string;
  };
  productCategories: {
    loading: boolean;
    data: ProductCategory[];
    error: null | string;
  };
};

export const ACTIONS = {
  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
  SET_PRODUCTS: "SET_PRODUCTS",
  SET_PRODUCTS_LOADING: "SET_PRODUCTS_LOADING",
  SET_PRODUCTS_ERROR: "SET_PRODUCTS_ERROR",
  SET_PRODUCT_CATEGORIES: "SET_PRODUCT_CATEGORIES",
  SET_PRODUCT_CATEGORIES_ERROR: "SET_PRODUCT_CATEGORIES_ERROR",
} as const;

export type Action =
  | { type: typeof ACTIONS.TOGGLE_SIDEBAR; payload?: boolean }
  | {
      type: typeof ACTIONS.SET_PRODUCTS;
      payload: { products: Product[]; total: number };
    }
  | { type: typeof ACTIONS.SET_PRODUCTS_LOADING; payload: boolean }
  | { type: typeof ACTIONS.SET_PRODUCTS_ERROR; payload: string }
  | { type: typeof ACTIONS.SET_PRODUCT_CATEGORIES; payload: ProductCategory[] }
  | { type: typeof ACTIONS.SET_PRODUCT_CATEGORIES_ERROR; payload: string };

type AppContextType = {
  appState: State;
  appDispatch: Dispatch<Action>;
};

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be defined inside AppProvider");
  }

  return context;
};
