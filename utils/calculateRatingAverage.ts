import { Review } from "@prisma/client";

export const calculateRatingAverage = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;

  return reviews.reduce((acc, next) => acc + next.rating, 0) / reviews.length;
};
