import express from "express";
import transactionController from "../controllers/transactionController.js";

const router = express.Router();

// transaction routes

router.get("/", transactionController.getAllTrans);
router.get("/:id", transactionController.getIdTrans);
router.get("/type/:type", transactionController.getType);
router.get("/value/:min/:max", transactionController.getValue);
router.get("/year/:year", transactionController.getYear);




export default router;