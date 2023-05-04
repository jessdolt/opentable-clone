import Link from "next/link";
import React from "react";

const RestaurantNav = () => {
  return (
    <nav className="flex text-reg border-b pb-2">
      <Link href="/restaurant/pasta" className="mr-7">
        Overview
      </Link>
      <Link href="/restaurant/pasta/menu" className="mr-7">
        Menu
      </Link>
    </nav>
  );
};

export default RestaurantNav;
