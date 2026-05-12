import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        AccountId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
        },

        targetAccountId: {
            type: String,
            trim: true,
            default: ""
        },

        type: {
            type: String,


        },

        value: {
            type: Number
        },

        balancePrevious: {
            type: Number,
        },

        currentBalance: {
            type: Number,
        },

        description: {
            type: String,
        },

        status: {
            type: String,
            default: ""
        },


    }
);

export default mongoose.model("Transaction", transactionSchema);