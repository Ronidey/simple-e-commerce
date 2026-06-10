import { useMemo, useState } from "react";
import FilterHeading from "./FilterHeading";
import { useSearchParams } from "react-router";
import { useAppContext } from "../../../store/AppContext";
import FILTERS from "../../../constants/filters";

const BRANDS_LIMIT = 5;

export default function BrandsFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMore, setShowMore] = useState(false);
  const { appState } = useAppContext();
  const brands = useMemo(() => {
    const list = new Set<string>();

    appState.products.data.forEach((item) => {
      if (item.brand) {
        list.add(item.brand);
      }
    });

    return [...list];
  }, [appState.products.data]);

  const totalBrandsToShow = showMore ? brands.length : BRANDS_LIMIT;

  const selectedBrands = searchParams.get(FILTERS.BRAND)?.split(",") || [];

  const toggleCategorySelect = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams);
    const updatedCategories = params.get(FILTERS.BRAND)?.split(",") || [];

    if (updatedCategories.includes(categorySlug)) {
      updatedCategories.splice(updatedCategories.indexOf(categorySlug), 1);
    } else {
      updatedCategories.push(categorySlug);
    }

    if (updatedCategories.length === 0) params.delete(FILTERS.BRAND);
    else params.set(FILTERS.BRAND, updatedCategories.join(","));

    setSearchParams(params);
  };

  if (brands.length === 0) return null;

  return (
    <div>
      <FilterHeading>Brands</FilterHeading>
      {brands.slice(0, totalBrandsToShow).map((item, idx) => (
        <div key={idx} className="text-sm flex items-center mb-2">
          <input
            id={item}
            type="checkbox"
            checked={selectedBrands.includes(item)}
            onChange={() => toggleCategorySelect(item)}
          />
          <label htmlFor={item} className="select-none ml-2">
            {item}
          </label>
        </div>
      ))}

      {brands.length > BRANDS_LIMIT && (
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
