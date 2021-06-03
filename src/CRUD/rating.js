import React from "react";
import StarRating from "react-star-ratings";

export const showAverage = (star, nrdereviews) => {
  // ! ---  paramentrul nrdereviews e optional,doar pentru product page ----!

  //   if (star) {
  //     let total = [];
  //     let length = star.length;

  //     star.map((r) => {
  //       if (r) {
  //         total.push(r.star);
  //       }
  //     });
  //     let totalReduced = total.reduce((p, n) => p + n, 0);
  //     let highest = length * 5;
  //     let result = (totalReduced * 5) / highest;

  //     return <StarRating rating={result} />;
  //   }

  // 5 2 3
  //   if (star) {
  //     let total = [];
  //     star.map((r) => {
  //       total.push(r.star);
  //     });
  //     let totalReduced = total.reduce((p, n) => p + n, 0);
  //     let length = total.length;
  //     let result = totalReduced / length;

  //     console.log(result);
  //   }

  // 4 1
  let average;
  let numberOfReviews;

  if (star) {
    let total = [];
    star.map((arg) => {
      if (arg.star) total.push(arg.star);
    });
    let totalReduced = total.reduce((p, n) => p + n, 0);
    let length = total.length;
    let result = totalReduced / length;
    average = result;
    numberOfReviews = length;
  }
  if (average) {
    return (
      <div className="flex items-center justify-center">
        <StarRating
          rating={average}
          isSelectable={false}
          starRatedColor="yellow"
          starHoverColor="yellow"
          starDimension="15px"
          starSpacing="1px"
        />
        <span className="text-gray-700 text-sm ml-1 mt-0.5">
          {average.toFixed(2)}
        </span>
        <span
          className={`text-gray-700 text-sm ${
            nrdereviews ? "ml-4" : "ml-1"
          } mt-0.5`}
        >
          {nrdereviews ? numberOfReviews : `(${numberOfReviews})`}
        </span>
      </div>
    );
  }
};
