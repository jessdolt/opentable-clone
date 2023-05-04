import Link from "next/link";
import React from "react";
import NavBar from "../../../components/NavBar";
import Header from "../components/Header";
import RestaurantNav from "../components/RestaurantNav";
import MenuCard from "../components/MenuCard";

const RestaurantMenu = () => {
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNav />
        <MenuCard />
      </div>
    </>
  );
};

export default RestaurantMenu;
