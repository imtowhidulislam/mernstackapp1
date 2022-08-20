import mongoose from "mongoose";

const createUserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

const userDB = mongoose.model("userDB", createUserSchema);
export default userDB;
