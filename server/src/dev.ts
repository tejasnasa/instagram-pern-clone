import app from "./app";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

const port = process.env.PORT;

prisma
  .$connect()
  .then(() => {
    console.log("Connected to the database.");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to the database:", err);
  });
