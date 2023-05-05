import React from "react";

const Feedback = ({ review }: { review: number }) => {
  const renderReview = () => {
    if (review >= 4) {
      return "Awesome";
    } else if (review >= 3) {
      return "Satisfied";
    } else if (review >= 2) {
      return "Average";
    } else if (review >= 1) {
      return "Boring";
    } else if (review < 1) {
      return "Disgusting";
    }
  };
  return <p className="ml-2 text-sm">{renderReview()}</p>;
};

export default Feedback;
