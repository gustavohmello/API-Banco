import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
    {
        UserId: {
            type: Number,
            required: true,
            trim: true,
        },

        numberCount: {
            type: Number,
            required:true,
            trim:true,
        },

        agency: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            Type:String,
            required: true,
        },

        balamce: {
            type: Number,
            required: true,
        },

        limit: {
            type: Number,
            required: true,
        },

        active: {
            type: String,
            required: true,
        },

        blocked: {
            type: String,
            required: true
        },
        

        
    }
)

export default mongoose.model("Account", UserSchema);