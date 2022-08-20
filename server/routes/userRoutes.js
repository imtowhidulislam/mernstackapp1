import express from "express";
import {
  allUsers,
  deleteUsers,
  Login,
  SignUp,
  singleUsers,
  updateUsers,
} from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/", allUsers);
userRoutes.get("/:Id", singleUsers);
userRoutes.patch("/:Id", updateUsers);
userRoutes.delete("/:Id", deleteUsers);
userRoutes.post("/loginuser", Login);
userRoutes.post("/signupuser", SignUp);

export default userRoutes;
