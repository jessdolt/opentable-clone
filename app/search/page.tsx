import React from "react";
import NavBar from "../components/NavBar";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import RestaurantCard from "./components/RestaurantCard";

const SearchPage = () => {
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SideBar />
        <div className="w-5/6">
          <RestaurantCard />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
