import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";
import React from "react";

const SideBar = ({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) => {
  return (
    <div className="w-1/5">
      <div className="border-b pb-4">
        <h1 className="mb-2">Region</h1>
        {locations.length > 0
          ? locations.map((location) => (
              <Link
                href={{
                  pathname: "/search",
                  query: {
                    ...searchParams,
                    city: location.name,
                  },
                }}
                key={location.id}
                legacyBehavior
              >
                <p className="font-light text-reg capitalize cursor-pointer">
                  {location.name}
                </p>
              </Link>
            ))
          : "No Region Found"}
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.length > 0
          ? cuisines.map((cus) => (
              <Link
                href={{
                  pathname: "/search",
                  query: {
                    ...searchParams,

                    cuisine: cus.name,
                  },
                }}
                key={cus.id}
                legacyBehavior
              >
                <p className="font-light text-reg capitalize cursor-pointer">
                  {cus.name}
                </p>
              </Link>
            ))
          : "No Cuisine Found"}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, price: PRICE.CHEAP },
            }}
            legacyBehavior
          >
            <button className="border w-full text-reg font-light rounded-l p-2">
              $
            </button>
          </Link>

          <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, price: PRICE.REGULAR },
            }}
            legacyBehavior
          >
            <button className="border-r border-t border-b w-full text-reg font-light p-2">
              $$
            </button>
          </Link>

          <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, price: PRICE.EXPENSIVE },
            }}
            legacyBehavior
          >
            <button className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r">
              $$$
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
