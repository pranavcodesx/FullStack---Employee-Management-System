import express from "express";
import cors from "cors";
import "dotenv/config";
import { setServers } from "node:dns";
import multer from "multer";
import connectDB from "./config/db.js";

const app = express()
const PORT = process.env.PORT || 4000;


// Middleware
app.use(cors())
app.use(express.json())
app.use(multer().none())

// Routes
app.get("/", (req, res)=> res.send("Server is running"))

setServers([process.env.MONGODB_DNS_SERVER || "1.1.1.1"]);

await connectDB()
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
