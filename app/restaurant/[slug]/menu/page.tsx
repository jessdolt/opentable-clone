import React from "react";
import RestaurantNav from "../components/RestaurantNav";
import MenuCard from "../components/MenuCard";
import { PrismaClient, Item } from "@prisma/client";

const prisma = new PrismaClient();

const fetchRestaurantMenu = async (slug: string): Promise<Item[]> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });

  if (!restaurant) {
    throw new Error("asd");
  }

  return restaurant.items;
};

const RestaurantMenu = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const menu = await fetchRestaurantMenu(slug);
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNav slug={slug} />

        {menu.map((x) => (
          <MenuCard menu={x} key={x.id} />
        ))}
      </div>
    </>
  );
};

export default RestaurantMenu;
