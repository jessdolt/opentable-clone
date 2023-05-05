import { Cuisine, Location, PRICE, Review } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { calculateRatingAverage } from "../../../utils/calculateRatingAverage";
import Feedback from "../../components/Feedback";
import Price from "../../components/Price";
import Stars from "../../components/Stars";

const RestaurantCard = ({
  restaurant,
}: {
  restaurant: {
    name: string;
    main_image: string;
    slug: string;
    price: PRICE;
    cuisine: Cuisine;
    location: Location;
    review: Review[];
  };
}) => {
  return (
    <div className="border-b flex pb-5">
      <img
        src={restaurant.main_image}
        alt={restaurant.name}
        className="w-44 rounded object-cover"
      />
      <div className="pl-5">
        <h2 className="text-3xl capitalize">{restaurant.name}</h2>
        <div className="flex items-start">
          <Stars reviews={restaurant.review} />
          <Feedback review={calculateRatingAverage(restaurant.review)} />
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
