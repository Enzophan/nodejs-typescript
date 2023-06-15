import express from "express";
import requiredUser from "../middleware/requiredUser";
import UserController from "../controllers/user.controller";
import hasPermission from "../middleware/hasPermission";
import { USERTYPE, MODULES, ACTIONS } from '../utils/enums'

const router = express.Router();


router.get("/init", UserController.initAdminUser);
router.get("/", requiredUser, UserController.getUser);
router.get("/find/:id", requiredUser, hasPermission({ type: USERTYPE.ADMIN, moduleName: MODULES.USER, actionName: ACTIONS.VIEW }), UserController.getUser);
router.get("/all", requiredUser, hasPermission({ type: USERTYPE.USER, moduleName: MODULES.USER, actionName: ACTIONS.VIEW }), UserController.getAllUsers);
router.post("/create", requiredUser, hasPermission({ type: USERTYPE.ADMIN, moduleName: MODULES.USER, actionName: ACTIONS.ADD }), UserController.createUser);
router.put("/update/:id", requiredUser, hasPermission({ type: USERTYPE.ADMIN, moduleName: MODULES.USER, actionName: ACTIONS.EDIT }), UserController.updateUser);
router.delete("/delete/:id", requiredUser, hasPermission({ type: USERTYPE.ADMIN, moduleName: MODULES.USER, actionName: ACTIONS.DELETE }), UserController.deleteUser);

export default router;
