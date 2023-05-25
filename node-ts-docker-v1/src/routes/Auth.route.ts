import express from "express";
import AuthController from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", AuthController.Login);
router.post("/register", AuthController.Register);
router.post("/refresh", AuthController.Refresh);
// router.post("/reset-password", () => {});
// router.post("/forgot-password", () => {});

export default router;
