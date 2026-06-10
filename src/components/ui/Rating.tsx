import clsx from "../../lib/clsx";
import { HalfStar, Star } from "../icons";

type Props = {
  rating: number;
  size?: "xs" | "sm" | "md";
};

export default function Rating({ rating, size }: Props) {
  return (
    <div
      className={clsx(
        "flex items-center",
        size === "xs" ? "text-xs" : size === "sm" ? "text-sm" : "text-base",
      )}
    >
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((num) =>
          rating < num && rating > num - 1 ? (
            <span key={num} className="text-yellow-400">
              <HalfStar />
            </span>
          ) : (
            <span
              key={num}
              className={clsx(
                rating >= num ? "text-yellow-400" : "text-gray-200",
              )}
            >
              <Star />
            </span>
          ),
        )}
      </div>
      <div className="text-gray-500 ml-1">({rating})</div>
    </div>
  );
}
