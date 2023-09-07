import express from "express";
import { sse } from "../sse";

const router = express.Router();

router.get("/stream", sse.init);

export default router;
