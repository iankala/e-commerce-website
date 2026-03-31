import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productModel from '../models/productModel.js';
import { updateRankings } from '../controllers/reviewController.js';

dotenv.config();

const updateAllProductRankings = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB');

        // Update rankings for all products
        await updateRankings({ 
            json: (data) => console.log('Rankings updated:', data), 
            success: true 
        });

        console.log('Rankings updated successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error updating rankings:', error);
        process.exit(1);
    }
};

updateAllProductRankings();
