import express from "express";
import adminController from "../controllers/adminController.js";

const router = express.Router();

router.get("/users/:status", adminController.getUsersByStatus);
router.patch("/users/:id/:action", adminController.setUserStatus);
router.get("/accounts/:status", adminController.getAccountsByStatus);
router.patch("/accounts/:id/close", adminController.closeAccount);
router.patch("/accounts/:id/block", adminController.setAccountBlockStatus);
router.patch("/accounts/:id/unblock", adminController.setAccountBlockStatus);
router.get("/reports/general", adminController.getGeneralReport);
router.get("/reports/financial", adminController.getFinancialReport);
router.post("/accounts/:id/monthly-fee", adminController.applyMonthlyFee);
router.post("/transactions/:id/refund", adminController.refundTransaction);
router.get("/accounts/top-balances/:limit", adminController.getTopBalances);

export default router;
