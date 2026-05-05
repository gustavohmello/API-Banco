import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            trim: true,
        },

        numberCount: {
            type: Number,
            required:true,
            trim:true,
        },

        agency: {
            type: Number,
            required: true,
            trim: true,
        },

        type: {
            type:String,
            required: true,
            enum: ["corrente", "poupança"],
        },

        balance: {
            type: Number,
            required: true,
        },

        limit: {
            type: Number,
            required: true,
        },

        active: {
            type: String,
            default: true,
        },

        blocked: {
            type: Boolean,
           default: false,
        },
        

        
    }
)

export default mongoose.model("Account", accountSchema);