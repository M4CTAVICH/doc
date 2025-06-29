import express from "express";
import {
  fetchAllFinance,
  fetchFinanceById,
  addFinance,
  editFinance,
  removeFinance,
} from "../controllers/Finance.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize(["doctor", "assistant"]),
  fetchAllFinance
);
router.get(
  "/:id",
  authenticate,
  authorize(["doctor", "assistant"]),
  fetchFinanceById
);
router.post("/", authenticate, authorize(["doctor", "assistant"]), addFinance);

router.put("/:id", authenticate, authorize(["doctor"]), editFinance);
router.delete("/:id", authenticate, authorize(["doctor"]), removeFinance);

export default router;
