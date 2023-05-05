import React from "react";
import { PRICE } from "@prisma/client";

const Price = ({ price }: { price: PRICE }) => {
  const renderPrice = () => {
    if (price === PRICE.CHEAP) {
      return (
        <>
          <span className="font-bold">$$</span>
          <span className="text-gray-400">$$</span>
        </>
      );
    } else if (price === PRICE.REGULAR) {
      return (
        <>
          <span className="font-bold">$$$</span>
          <span className="text-gray-400">$</span>
        </>
      );
    } else if (price === PRICE.EXPENSIVE) {
      return (
        <>
          <span className="font-bold">$$$$</span>
        </>
      );
    }
  };

  return <p className="flex mr-3">{renderPrice()}</p>;
};

export default Price;
