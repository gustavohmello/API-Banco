import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

// Routers users

router.post("/", userController.createUser);
router.get("/", userController.listUser);
router.get("/:id", userController.listUserID);
router.put("/:id",userController.updateUser);
router.delete("/:id",userController.userDelet);
router.get("/CPF/:CPF",userController.getUserAndCpf);
router.get("/Email/:Email",userController.getUserAndEmail);

// Rotas especificas precisam vir antes de /: id




export default router;