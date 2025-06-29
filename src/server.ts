import express from "express";
import cors from "cors";

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());
