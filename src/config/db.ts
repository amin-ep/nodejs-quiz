import mongoose from "mongoose";

export const connectDB = (DB: string) => {
  try {
    mongoose.connect(DB);
  } catch (err) {
    console.log(err as Error);
  }
};
