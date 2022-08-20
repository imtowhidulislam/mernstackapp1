import mongoose from "mongoose";

const createUserSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    reps: {
      type: String,
      required: true,
      trim: true,
    },
    load: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

const mernStack = mongoose.model("marnStack", createUserSchema);
export default mernStack;
