import { useSearchParams } from "react-router";
import FilterHeading from "./FilterHeading";
import React, { useEffect, useState } from "react";
import FILTERS from "../../../constants/filters";

const MIN_PRICE = "min-price";
const MAX_PRICE = "max-price";

export default function PriceRangeFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 0,
  });

  useEffect(() => {
    const min = Number(searchParams.get(FILTERS.MIN_PRICE)) || 0;
    const max = Number(searchParams.get(FILTERS.MAX_PRICE)) || 0;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPriceRange({ min, max });
  }, [searchParams]);

  const handleApplyFilters = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (priceRange.min) {
      params.set(MIN_PRICE, String(priceRange.min));
    } else {
      params.delete(MIN_PRICE);
    }

    if (priceRange.max) {
      params.set(MAX_PRICE, String(priceRange.max));
    } else {
      params.delete(MAX_PRICE);
    }

    setSearchParams(params);
  };

  return (
    <div>
      <FilterHeading>Price Range</FilterHeading>
      <form className="w-full" onSubmit={handleApplyFilters}>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min || ""}
            onChange={(e) =>
              setPriceRange((prev) => ({
                ...prev,
                min: Number(e.target.value),
              }))
            }
            className="flex-1 min-w-6 bg-white text-gray-500 rounded-md outline-0 p-2 border border-gray-200"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max || ""}
            onChange={(e) =>
              setPriceRange((prev) => ({
                ...prev,
                max: Number(e.target.value),
              }))
            }
            className="flex-1 min-w-6 bg-white text-gray-500 rounded-md outline-0 p-2 border border-gray-200"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-400 text-white mt-4 rounded-md"
        >
          Apply
        </button>
      </form>
    </div>
  );
}
