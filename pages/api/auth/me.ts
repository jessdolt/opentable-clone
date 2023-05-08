import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["authorization"] as String;
  const token = bearerToken.split(" ")[1];

  const payload = jwt.decode(token) as { email: string };

  if (!payload.email) {
    res.status(401).json({
      errorMessage: "Unathorized request",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      city: true,
      phone: true,
    },
  });

  if (!user) {
    res.status(401).json({ errorMessage: "User not found" });
  }

  return res.json({
    id: user?.id,
    firstName: user?.first_name,
    lastname: user?.last_name,
    city: user?.city,
    phone: user?.phone,
    email: user?.email,
  });
}
