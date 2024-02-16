import express from "express";
import mongoose from "mongoose";
import routes from "./src/routes";

mongoose
  .connect("mongodb://localhost:27017/myBlogsDatabase")
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use("/api", routes);

    app.listen(9000, () => {
      console.log(`Server has started!`);
    });
  });