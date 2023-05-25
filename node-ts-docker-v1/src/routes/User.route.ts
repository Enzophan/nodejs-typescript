import express from "express";
import requiredUser from "../middleware/requiredUser";
import UserController from "../controllers/user.controller";

const router = express.Router();

// router.get("/", UserController.getAllUsers);
router.get("/", requiredUser, UserController.getUser);
router.get("/find/:id", requiredUser, UserController.getUser);
router.get("/all", requiredUser, UserController.getAllUsers);
router.post("/create", requiredUser, UserController.createUser);
router.put("/update/:id", requiredUser, UserController.updateUser);
router.delete("/delete/:id", requiredUser, UserController.deleteUser);

export default router;
