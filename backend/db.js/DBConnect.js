import mongoose from "mongoose";

const DBConnect = async ()=>{
    try {
        await mongoose.connect(`${process.env.DATABASE}/leaderboard`)
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

export default DBConnect;
