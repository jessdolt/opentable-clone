import React from "react";
import { convertToTime, Time } from "../../../../utils/convertToTime";

const Header = ({
  image,
  name,
  date,
  partySize,
}: {
  image: string;
  name: string;
  date: string;
  partySize: string;
}) => {
  const [day, time] = date.split("T");
  return (
    <div>
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img src={image} alt={name} className="w-32 h-18 rounded" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">Tues, 22, 2023</p>
            <p className="mr-6">{convertToTime(time as Time)}</p>
            <p className="mr-6">
              {partySize} {+partySize > 1 ? "people" : "person"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
