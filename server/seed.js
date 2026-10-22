import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";

const TemporaryPassword = "admin123";

async function registerAdmin() {
    try {
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

        if(!ADMIN_EMAIL){
            throw new Error("Missing ADMIN_EMAIL env variable");
        }

        await connectDB()

        const existingAdmin = await User.findOne({email: ADMIN_EMAIL});

        if(existingAdmin){
            console.log("User already exists as role", existingAdmin.role);
            return;
        }

            const hashedPassword = await bcrypt.hash(TemporaryPassword, 10)

            const admin = await User.create({
                email: ADMIN_EMAIL,
                password: hashedPassword,
                role: "ADMIN",
            })

            console.log("Admin user created");
            console.log("\nemail:", admin.email);
            console.log("password:", TemporaryPassword);
            console.log("\nchange the password after login.");
    } catch (error) {
        console.error("Seed failed:", error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

registerAdmin();