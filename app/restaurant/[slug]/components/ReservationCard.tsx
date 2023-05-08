"use client";
import React, { useState } from "react";
import { partySize, times } from "../../../../data";
import ReactDatePicker from "react-datepicker";

const ReservationCard = ({
  openTime,
  closeTime,
}: {
  openTime: string;
  closeTime: string;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const filterTypeRestaurant = () => {
    return times.filter(
      (time) => time.time >= openTime && time.time <= closeTime
    );
  };

  return (
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select name="" className="py-3 border-b font-light" id="">
          {partySize.map((size, index) => (
            <option value={size.value} key={index}>
              {size.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[30%]">
          <label htmlFor="">Date</label>
          <ReactDatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="py-3 border-b font-light text-reg w-10"
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select name="" id="" className="py-3 border-b font-light">
            {filterTypeRestaurant().map((time, index) => (
              <option value={time.time} key={index}>
                {time.displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">
          Find a Time
        </button>
      </div>
    </div>
  );
};

export default ReservationCard;
