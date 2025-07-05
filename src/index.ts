import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
//import jwt  from "jsonwebtoken"
//import  connectDB from './db.ts' doesnot work
import connectDB from "./db";
connectDB();
import User from "./Routes/user";
import UserModel from "./models/userModel";

const app = express();
app.use(express.json());
app.use("/api/v1", User);
//code

app.listen(3001, () => {
  console.log("Server in UP");
});
