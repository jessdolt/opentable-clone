import axios from "axios";
import React, { useEffect, useState } from "react";

interface Availability {
  slug: string;
  day: string;
  time: string;
  partySize: number;
}

interface Data {
  time: string;
  available: boolean;
}

const useAvailabilities = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<Data[] | null>(null);

  const fetchAvailabilities = async ({
    slug,
    day,
    time,
    partySize,
  }: Availability) => {
    setLoading(true);

    try {
      // http://localhost:3000/api/restaurant/curryish-tavern-toronto/availability?day=2023-02-03&time=14:00:00.000Z&partySize=4
      const response = await axios.get(
        `http://localhost:3000/api/restaurant/${slug}/availability`,
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );

      setData(response.data);
    } catch (error: any) {
      setError(error?.response?.data?.errorMessage);
    }

    setLoading(false);
  };

  return {
    loading,
    error,
    data,
    fetchAvailabilities,
  };
};

export default useAvailabilities;
