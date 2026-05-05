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
            required: true,
            unique: true,
            trim: true,
        },

        type: {
            type: String,
            require: true,
            
        },

        balancePrevious: {
            type: Number,
            required: true,
        },

        currentPalance: {
            type: Number,
            required: true,
        },

        descripition: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            required: true,
            unique: true,
        },


    }
);

export default mongoose.model("Transaction", transactionSchema);