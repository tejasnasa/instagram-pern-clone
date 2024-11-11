import mongoose from "mongoose";
import app from "./app";

mongoose
  .connect(process.env.MONGO_SECRET)
  .then(() => {
    console.log("Database connected!");
    app.listen(3000, () => {
      console.log("App is working!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
