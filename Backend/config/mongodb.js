import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log("✅ DB connected");
    });
    mongoose.connection.on("error", (err) => {
        console.error("❌ DB connection error:", err);
    });
    mongoose.connection.on("disconnected", () => {
        console.log("⚠️  DB disconnected, attempting to reconnect...");
    });
    
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
        console.error("❌ MONGODB_URI is not defined in .env file");
        return;
    }
    
    try {
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
            minPoolSize: 5,
            retryWrites: true,
            w: 'majority'
        });
        console.log("✅ MongoDB connected successfully");
    } catch (err) {
        console.error("❌ Failed to connect to MongoDB:", err.message);
        // Retry connection after 10 seconds
        setTimeout(() => {
            connectDB();
        }, 10000);
    }
};

export default connectDB;