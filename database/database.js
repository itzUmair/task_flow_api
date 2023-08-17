import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

export default connectDB;
