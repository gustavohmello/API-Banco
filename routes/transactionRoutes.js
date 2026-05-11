import express from "express";
import transactionController from "../controllers/transactionController.js";

const router = express.Router();

// transaction routes

router.get("/",transactionController.getTransaction);


export default router;