import express from "express";
import {
  getAllContests,
  createContest,
  getContestById,
  updateContest,
  deleteContest,
} from "../controllers/contest.controller";
// import testData from "../dev/test-data.json";

const router = express.Router();

router.get("/contests", getAllContests);
router.post("/contests", createContest);
router.get("/contest/:contestId", getContestById);
router.post("/contest/:contestId", updateContest);
router.delete("/contest/:contestId", deleteContest);

export default router;
