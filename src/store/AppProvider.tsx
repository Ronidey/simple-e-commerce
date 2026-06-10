import { useReducer, type ReactNode } from "react";
import { AppContext, type Action, type State } from "./AppContext";

const state: State = {
  isSidebarOpen: window.innerWidth >= 650,
  products: {
    loading: true,
    data: [],
    total: 0,
    error: null,
  },
  productCategories: {
    loading: true,
    data: [],
    error: null,
  },
};

const reducer: React.Reducer<State, Action> = (state, action): State => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        isSidebarOpen:
          action.payload !== undefined ? action.payload : !state.isSidebarOpen,
      };

    case "SET_PRODUCTS_LOADING":
      return {
        ...state,
        products: {
          ...state.products,
          loading: action.payload,
        },
      };

    case "SET_PRODUCTS":
      return {
        ...state,
        products: {
          loading: false,
          data: action.payload.products,
          total: action.payload.total,
          error: null,
        },
      };

    case "SET_PRODUCTS_ERROR":
      return {
        ...state,
        products: {
          ...state.products,
          loading: false,
          error: action.payload,
        },
      };

    case "SET_PRODUCT_CATEGORIES":
      return {
        ...state,
        productCategories: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };

    case "SET_PRODUCT_CATEGORIES_ERROR":
      return {
        ...state,
        productCategories: {
          ...state.productCategories,
          error: action.payload,
          loading: false,
        },
      };

    default:
      return state;
  }
};

type Props = {
  children: ReactNode;
};

export default function AppProvider({ children }: Props) {
  const [appState, appDispatch] = useReducer(reducer, state);

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AppContext.Provider>
  );
}
