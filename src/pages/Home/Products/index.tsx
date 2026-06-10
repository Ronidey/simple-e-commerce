import { useEffect } from "react";
import { useSearchParams } from "react-router";
import Skeleton from "../../../components/ui/Skeleton";
import { ACTIONS, useAppContext } from "../../../store/AppContext";
import styles from "./styles.module.css";
import ProductCard from "./ProductCard";
import Pagination from "../../../components/ui/Pagination";
import {
  fetchProducts,
  PRODUCTS_LIMIT,
} from "../../../services/productService";
import parseFilters from "../../../lib/parseFilters";
import FILTERS from "../../../constants/filters";
import clsx from "../../../lib/clsx";

export default function Products() {
  const { appState } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { appDispatch } = useAppContext();
  const filters = parseFilters(searchParams);

  // filtering products based on client side filter => brand, price range
  const filteredProducts = appState.products.data.filter((product) => {
    if (filters.brand.length && !filters.brand.includes(product.brand))
      return false;

    if (filters.minPrice && product.price < filters.minPrice) return false;

    if (filters.maxPrice && product.price > filters.maxPrice) return false;

    return true;
  });

  const appliedFilters: string[] = [];

  if (filters.brand.length) appliedFilters.push(FILTERS.BRAND);
  if (filters.minPrice) appliedFilters.push(FILTERS.MIN_PRICE);
  if (filters.maxPrice) appliedFilters.push(FILTERS.MAX_PRICE);

  useEffect(() => {
    (async () => {
      appDispatch({ type: ACTIONS.SET_PRODUCTS_LOADING, payload: true });

      try {
        const res = await fetchProducts({
          page: filters.page,
          category: filters.category,
        });

        appDispatch({
          type: ACTIONS.SET_PRODUCTS,
          payload: { products: res.products, total: res.total },
        });
      } catch (err) {
        appDispatch({
          type: ACTIONS.SET_PRODUCTS_ERROR,
          payload: err as string,
        });
      }
    })();
  }, [currentPage, filters.page, filters.category]);

  const handleNavigate = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(FILTERS.PAGE, String(page));

    setSearchParams(params);
  };

  const handleRemoveFilter = (param: string) => {
    const params = new URLSearchParams(searchParams);

    params.delete(param);

    setSearchParams(params);
  };

  return (
    <div className="p-8 min-h-full flex flex-col">
      {appliedFilters.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center text-lg gap-2">
            <span>Applied Filters:</span>

            <div className="ml-4 flex items-center gap-2">
              {appliedFilters.map((item) => (
                <div
                  key={item}
                  className="text-sm bg-blue-400 px-2 py-1 rounded text-white"
                >
                  {item}

                  <button
                    onClick={() => handleRemoveFilter(item)}
                    className="ml-2"
                  >
                    &#10005;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {appState.products.loading ? (
        <div className={clsx(styles.productsContainer, "flex-1")}>
          {new Array(5).fill("").map((_, idx) => (
            <Skeleton key={idx} width="100%" height="100%" />
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className={clsx(styles.productsContainer, "flex-1")}>
          {filteredProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex justify-center items-center text-2xl font-medium text-gray-500">
          No Products Found :(
        </div>
      )}

      {/* Removing pagination if client side filters are applied! */}
      {appliedFilters.length === 0 && (
        <div className="mt-12 flex justify-center">
          <Pagination
            limit={PRODUCTS_LIMIT}
            currentPage={currentPage}
            total={appState.products.total}
            onNavigate={handleNavigate}
          />
        </div>
      )}
    </div>
  );
}
