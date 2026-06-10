import BrandsFilter from "./BrandsFilter";
import CategoriesFilter from "./CategoriesFilter";
import PriceRangeFilter from "./PriceRangeFilter";

export default function Sidebar() {
  return (
    <div className="h-full p-4">
      <CategoriesFilter />
      <hr className="my-4 text-gray-300" />

      <PriceRangeFilter />
      <hr className="my-4 text-gray-300" />

      <BrandsFilter />
    </div>
  );
}
