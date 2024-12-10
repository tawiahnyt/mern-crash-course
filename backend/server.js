/** @format */

import express from "express";
import dotenv from "dotenv";
import { connectionDB } from "./config/db.js";
import productRoutes from './routes/product.route.js'

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/products', productRoutes)

app.listen(5000, () => {
  connectionDB();
  console.log("Server started at http://localhost:5000");
});