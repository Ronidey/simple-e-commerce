import type { Review } from "../../types/product";
import Rating from "./Rating";

export default function UserReview({ reviewerName, comment, rating }: Review) {
  return (
    <div>
      <header className="flex items-center mb-2">
        <div className="font-medium">{reviewerName}</div>
        <div className="ml-8">
          <Rating rating={rating} size="sm" />
        </div>
      </header>

      <div>
        <p className="text-sm text-gray-600">{comment}</p>
      </div>
    </div>
  );
}
