import { Star, StarHalf } from "lucide-react";

const StarRating = ({ rating, reviews, className = "mb-4" }: { rating: number; reviews?: string; className?: string }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  const cls = "h-4 w-4";

  return (
    <div className={`flex items-center ${className}`} role="img" aria-label={`Rated ${rating} out of 5`}>
      <div className="flex text-yellow-400">
        {Array.from({ length: fullStars }, (_, i) => (
          <Star key={"f" + i} className={`${cls} fill-current`} />
        ))}
        {halfStar && (
          <span className="relative inline-block">
            <Star className={`${cls} text-gray-600`} />
            <StarHalf className={`${cls} absolute inset-0 fill-current`} />
          </span>
        )}
        {Array.from({ length: emptyStars }, (_, i) => (
          <Star key={"e" + i} className={`${cls} text-gray-600`} />
        ))}
      </div>
      <span className="ml-2 text-sm text-gray-300">
        {rating}
        {reviews && <span className="text-gray-500"> ({reviews})</span>}
      </span>
    </div>
  );
};

export default StarRating;
