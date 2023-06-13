import express from "express";
import requiredUser from "../middleware/requiredUser";
import UserController from "../controllers/user.controller";
import hasPermission from "../middleware/hasPermission";

const router = express.Router();

// router.get("/", UserController.getAllUsers);
router.get("/", requiredUser, UserController.getUser);
router.get("/find/:id", requiredUser, UserController.getUser);
router.get("/all", requiredUser, hasPermission({ type: 'admin', moduleName: 'user', actionName: 'view' }), UserController.getAllUsers);
router.post("/create", requiredUser, UserController.createUser);
router.put("/update/:id", requiredUser, UserController.updateUser);
router.delete("/delete/:id", requiredUser, UserController.deleteUser);

export default router;
