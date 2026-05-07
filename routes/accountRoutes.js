import express from "express";
import accountController from "../controllers/accountController.js";

const router = express.Router();

// Routers accounts

router.post("/",accountController.createAccount);
router.get("/",accountController.getAccount);
router.get("/:id",accountController.getAccountById);
router.get("/numberCount/:numberCount",accountController.getByNumberCount);



export default router;