import React from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import RestaurantCard from "./components/RestaurantCard";
import { PrismaClient, Location, PRICE } from "@prisma/client";

const prisma = new PrismaClient();

const select = {
  id: true,
  name: true,
  main_image: true,
  price: true,
  slug: true,
  cuisine: true,
  location: true,
  review: true,
};

interface SearchParams {
  city: string | undefined;
  cuisine: string | undefined;
  price: PRICE;
}

const fetchRestaurantLocation = async ({
  city,
  cuisine,
  price,
}: SearchParams) => {
  const where: any = {};

  if (city) {
    const location = {
      name: {
        equals: city.toLocaleLowerCase(),
      },
    };

    where.location = location;
  }

  if (cuisine) {
    const cus = {
      name: {
        equals: cuisine.toLocaleLowerCase(),
      },
    };

    where.cuisine = cus;
  }

  if (price) {
    const pri = {
      equals: price,
    };
    where.price = pri;
  }

  return prisma.restaurant.findMany({
    where,
    select,
  });
};

const fetchLocations = async () => {
  return prisma.location.findMany();
};

const fetchCuisines = async () => {
  return prisma.cuisine.findMany();
};

const SearchPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const restaurants = await fetchRestaurantLocation({ ...searchParams });

  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.length > 0
            ? restaurants.map((restaurant) => (
                <>
                  <RestaurantCard restaurant={restaurant} key={restaurant.id} />
                </>
              ))
            : `No Restaurant Found in ${searchParams.city}`}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
