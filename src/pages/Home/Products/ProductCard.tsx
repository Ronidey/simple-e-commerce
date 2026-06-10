import { Link } from "react-router";
import type { Product } from "../../../types/product";
import Rating from "../../../components/ui/Rating";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Link
      key={product.id}
      to={`/products/${product.id}`}
      className="block p-4 shadow border border-gray-100 rounded"
    >
      <div className="h-full">
        <div className="h-2/3 border-b border-gray-200">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="h-1/3 mt-2 flex flex-col justify-between">
          <h4 className="font-medium mb-2">{product.title}</h4>

          <div className="flex items-center">
            <div className="text-lg">&#36;{product.price}</div>
            <div className="ml-2">
              <Rating rating={product.rating} size="xs" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
