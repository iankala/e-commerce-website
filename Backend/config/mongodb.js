import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log("DB connected");
    })
    mongoose.connection.on("error", (err) => {
        console.error("DB connection error:", err);
    });
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`, {
            serverSelectionTimeoutMS: 5000,
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err.message);
        // Retry connection after 5 seconds
        setTimeout(() => {
            connectDB();
        }, 5000);
    }
};

export default connectDB;