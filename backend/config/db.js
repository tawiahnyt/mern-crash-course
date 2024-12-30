/** @format */

import mongoose from "mongoose";

export const connectionDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb://localhost:27017/products`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
