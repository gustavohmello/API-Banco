import express from "express";
import dotenv from "dotenv";
import conectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ mensage: "API de loja do Banco funcionando " })
});

app.use("/user", userRoutes);
app.use("/account", accountRoutes);
app.use("/transaction", transactionRoutes);
app.use("/admin", adminRoutes);


const startServer = async () => {
    try {
        await conectDB();

        app.listen(PORT, () => {
            console.log(  `Servidor esta rodando na porta ${PORT}`);
        });
    }catch (error) {
        console.log("ERRO ao iniciar o servidor:", error.menssage);
    }
};

startServer();