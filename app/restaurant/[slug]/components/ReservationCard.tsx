"use client";
import React, { useState } from "react";
import { partySize as ps, times } from "../../../../data";
import ReactDatePicker from "react-datepicker";
import useAvailabilities from "../../../../hooks/useAvailabilities";
import Link from "next/link";
import { convertToTime } from "../../../../utils/convertToTime";

const ReservationCard = ({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) => {
  const { data, loading, error, fetchAvailabilities } = useAvailabilities();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<string>(openTime);
  const [partySize, setPartySize] = useState<number>(2);
  const [day, setDay] = useState<string>("");

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split("T")[0]);
      return setSelectedDate(date);
    }

    return setSelectedDate(null);
  };

  const handleClick = () => {
    const data = {
      slug,
      day,
      time,
      partySize,
    };

    fetchAvailabilities(data);
  };

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
        <select
          name=""
          className="py-3 border-b font-light"
          id=""
          value={partySize}
          onChange={(e) => setPartySize(+e.target.value)}
        >
          {ps.map((size, index) => (
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
            onChange={handleChangeDate}
            className="py-3 border-b font-light text-reg w-10"
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select
            name=""
            id=""
            className="py-3 border-b font-light"
            onChange={(e) => setTime(e.target.value)}
            value={time}
          >
            {filterTypeRestaurant().map((time, index) => (
              <option value={time.time} key={index}>
                {time.displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          className="bg-red-600 rounded w-full px-4 text-white font-bold h-16 disabled:bg-gray-400"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? "Loading.... " : "Find a Time"}
        </button>
      </div>

      {data && data.length ? (
        <div className="mt-4">
          <p className="text-reg">Select a Time</p>
          <div className="flex flex-wrap mt-2">
            {data.map((x) => {
              return x.available ? (
                <Link
                  href={`/reserve/${slug}?date=${day}T${x.time}&partySize=${partySize}`}
                  className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3"
                >
                  <p className="text-small font-bold">
                    {convertToTime(x.time)}
                  </p>
                </Link>
              ) : (
                <p className="bg-gray-300 p-2 w-24 mb-3 rounded mr-3"></p>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReservationCard;
