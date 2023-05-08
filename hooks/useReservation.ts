import axios from "axios";
import React, { useEffect, useState } from "react";

interface Availability {
  slug: string;
  day: string;
  time: string;
  partySize: number;
  bookerFirstName: string;
  bookerLastName: string;
  bookerPhone: string;
  bookerEmail: string;
  bookerOcassion: string;
  bookerRequests: string;
}

interface Data {
  time: string;
  available: boolean;
}

const useReservation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReservation = async ({
    slug,
    day,
    time,
    partySize,
    bookerFirstName,
    bookerLastName,
    bookerPhone,
    bookerEmail,
    bookerOcassion,
    bookerRequests,
  }: Availability) => {
    setLoading(true);

    try {
      // http://localhost:3000/api/restaurant/curryish-tavern-toronto/availability?day=2023-02-03&time=14:00:00.000Z&partySize=4
      const response = await axios.post(
        `http://localhost:3000/api/restaurant/${slug}/reserve`,
        {
          bookerFirstName,
          bookerLastName,
          bookerPhone,
          bookerEmail,
          bookerOcassion,
          bookerRequests,
        },
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );
    } catch (error: any) {
      setError(error?.response?.data?.errorMessage);
    }

    setLoading(false);
  };

  return {
    loading,
    error,
    createReservation,
  };
};

export default useReservation;
