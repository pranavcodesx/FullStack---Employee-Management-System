import mongoose from "mongoose";
import { setServers } from "node:dns";

const connectDB = async () => {
    setServers([process.env.MONGODB_DNS_SERVER || "1.1.1.1"]);

    try {
        mongoose.connection.on('connected', ()=> console.log("Database Connected"))
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.error("Database connection failed:", error.message)
        throw error;
    }
}

export default connectDB;