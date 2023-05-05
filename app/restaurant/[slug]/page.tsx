import React from "react";
import RestaurantNav from "./components/RestaurantNav";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";

import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";
import { PrismaClient, Cuisine, Location, PRICE, Review } from "@prisma/client";
import Images from "./components/Images";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  review: Review[];
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      review: true,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

const RestaurantDetails = async ({ params }: { params: { slug: string } }) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNav slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Rating reviews={restaurant.review} />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews reviews={restaurant.review} />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </>
  );
};

export default RestaurantDetails;
