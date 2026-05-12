import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        AccountId: {
            type: Number,
            required: true,
            trim: true,
            unique: true,
        },

        targetAccountId: {
            type: Number,
            unique: true,
            trim: true,
        },

        type: {
            type: String,
        
            
        },

        balancePrevious: {
            type: Number,
        },

        currentPalance: {
            type: Number,
        },

        descripition: {
            type: String,
        },

        status: {
            type: String,
        },


    }
);

export default mongoose.model("Transaction", transactionSchema);