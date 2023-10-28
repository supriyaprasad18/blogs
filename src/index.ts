import express, { Application } from "express";
import mongoose from "mongoose";
import { BlogRoutes } from "./routers";
const app: Application = express();
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import mongoSanitize from 'express-mongo-sanitize';
var xss = require('xss-clean');
import helmet from 'helmet';

dotenv.config();
const port=process.env.port||3000;

mongoose
  .connect(process.env.MONGODB_URI || "")
  .then(() => {
    console.log("db connected");
  })
  .catch((err: any) => {
    console.log(err);
  });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error in connecting to mongodb"));

db.once("open", function () {
  console.log("connected to mongodb");
});

app.use(xss());
app.use(mongoSanitize());
app.use(helmet());
app.use(bodyParser.json());
/** Routes goes here */
app.use(BlogRoutes);

app.listen(port, () => {
  console.log(`express running on port ${port}`);
});

export default app;
