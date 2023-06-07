import express from "express";
import requiredUser from "../middleware/requiredUser";
import RoleController from "../controllers/role.controller"

const router = express.Router();

router.get("/", requiredUser, RoleController.findRole);
router.post("/create", requiredUser, RoleController.createRole);
router.post("/update/:id", requiredUser, RoleController.editRole);
router.delete("/delete/:id", requiredUser, RoleController.deleteRole);

export default router;
