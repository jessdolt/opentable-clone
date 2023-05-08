import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data";
import { findAvailableTables } from "../../../../services/restaurant/findAvailableTables";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { slug, day, time, partySize } = req.query as {
      slug: string;
      day: string;
      time: string;
      partySize: string;
    };

    if (!day || !time || !partySize) {
      return res.status(400).json({
        errorMessage: "Invalid data provided",
      });
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        tables: true,
        open_time: true,
        close_time: true,
      },
    });

    if (!restaurant) {
      return res.status(400).json({
        errorMessage: "Invalid data provided",
      });
    }

    const searchTimesWithTables = await findAvailableTables({
      day,
      time,
      res,
      restaurant,
    });

    if (!searchTimesWithTables) {
      return res.status(400).json({
        errorMessage: "Invalid data provided",
      });
    }

    const availabilities = searchTimesWithTables
      .map((st) => ({
        time: st.time,
        available:
          st.tables.reduce((a, b) => a + b.seats, 0) >= parseInt(partySize),
      }))
      .filter(
        (availability) =>
          new Date(`${day}T${availability.time}`) >=
            new Date(`${day}T${restaurant.open_time}`) &&
          new Date(`${day}T${availability.time}`) <=
            new Date(`${day}T${restaurant.close_time}`)
      );

    return res.json(availabilities);
  }
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-02-03&time=14:00:00.000Z&partySize=4
// vivaan-fine-indian-cuisine-ottawa
