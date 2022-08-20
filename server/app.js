import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import "dotenv/config";
import workoutRoutes from "./routes/workoutRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

// ! Setting up the all the middlewires:::
app.use(cors());
app.use(bodyParser.json());
app.use("/api/workout", workoutRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(process.env.PORT, () => {
      console.log(`Server is running to port ${process.env.PORT}`);
      console.log("Connected to DB");
    })
  )
  .catch((err) => console.log(err));
