import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(

    {
        Name: {
            type: String,
            required: true,
            trim: true,
        },

        Email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        },

        CPF: {
            type: Number,
            required: true,
            trim: true,
            unique: true,
        },

        Telefone: {
            type: Number, 
            min:18,
            required: true,
            trim: true,
            unique: true,
        },

        Idade: {
            type: Number,
            required: true,
        },

        Ativo: {
            type: String,
            trim: true,
            default: true,
        },

    }
);

export default mongoose.model("User", UserSchema);
