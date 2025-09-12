import React from 'react'

const StarRating = ({ rating, reviews }:{ rating:number, reviews:string }) => {
    // full stars
    const fullStars = Math.floor(rating);
    // check if half star needed
    const halfStar = rating % 1 >= 0.5;
    // total 5 stars
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
        <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
                {/* full stars */}
                {Array(fullStars)
                    .fill(0)
                    .map((_, i) => (
                        <i key={"f" + i} className="fas fa-star"></i>
                    ))}

                {/* half star */}
                {halfStar && <i className="fas fa-star-half-alt"></i>}

                {/* empty stars */}
                {Array(emptyStars)
                    .fill(0)
                    .map((_, i) => (
                        <i key={"e" + i} className="far fa-star"></i>
                    ))}
            </div>
            <span className="ml-2">
                {rating} ({reviews})
            </span>
        </div>
    );

}

export default StarRating