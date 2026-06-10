import { useEffect, useState } from "react";
import { ACTIONS, useAppContext } from "../../../store/AppContext";
import { fetchProductCategories } from "../../../services/productService";
import FilterHeading from "./FilterHeading";
import { useSearchParams } from "react-router";
import FILTERS from "../../../constants/filters";

const CATEGORIES_LIMIT = 5;

export default function CategoriesFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { appState, appDispatch } = useAppContext();
  const categories = appState.productCategories.data;
  const [showMore, setShowMore] = useState(false);
  const totalCategoriesToShow = showMore ? categories.length : CATEGORIES_LIMIT;

  const selectedCategory = searchParams.get(FILTERS.CATEGORY);

  useEffect(() => {
    if (!categories.length) {
      (async () => {
        try {
          const res = await fetchProductCategories();
          appDispatch({ type: ACTIONS.SET_PRODUCT_CATEGORIES, payload: res });
        } catch (err) {
          appDispatch({
            type: ACTIONS.SET_PRODUCT_CATEGORIES_ERROR,
            payload: err as string,
          });
        }
      })();
    }
  }, [categories.length]);

  const toggleCategorySelect = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams);

    if (selectedCategory === categorySlug) {
      params.delete(FILTERS.CATEGORY);
    } else {
      params.set(FILTERS.CATEGORY, categorySlug);
    }

    params.set(FILTERS.PAGE, "1"); //reset pagination
    setSearchParams(params);
  };

  return (
    <div>
      <FilterHeading>Categories</FilterHeading>
      {categories.slice(0, totalCategoriesToShow).map((c) => (
        <div key={c.slug} className="text-sm flex items-center mb-2">
          <input
            id={c.slug}
            type="checkbox"
            checked={selectedCategory === c.slug}
            onChange={() => toggleCategorySelect(c.slug)}
          />
          <label htmlFor={c.slug} className="select-none ml-2">
            {c.name}
          </label>
        </div>
      ))}

      {categories.length > CATEGORIES_LIMIT && (
        <button
          onClick={() => setShowMore((prev) => !prev)}
          className="text-sm text-blue-500 hover:text-blue-600"
        >
          {showMore ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
}
