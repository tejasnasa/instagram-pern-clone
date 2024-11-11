import app from "./app";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => {
    console.log("Connected to the database.");
  })
  .catch((err) => {
    console.log("Failed to connect to the database:", err);
  });

export default app;
