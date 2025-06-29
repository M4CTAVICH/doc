import express from "express";
import {
  fetchAllFinance,
  fetchFinanceById,
  addFinance,
  editFinance,
  removeFinance,
} from "../controllers/Finance.js";

const router = express.Router();

router.get("/", fetchAllFinance);
router.get("/:id", fetchFinanceById);
router.post("/", addFinance);
router.put("/:id", editFinance);
router.delete("/:id", removeFinance);

export default router;
