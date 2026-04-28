import express from "express";
import dotenv from "dotenv";
import conectDB from "./config/db";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({mensage: "API de loja do Banco funcionando "})
});

const startServer = async () => {
    try {
        await conectDB();

        app.listen(PORT, () => {
            console.log(  `Servidor esta rodando a porta ${PORT}`);
        });
    }catch (error) {
        console.log("ERRO asiniciar o servidor:", error.mensage);
    }
};

startServer();