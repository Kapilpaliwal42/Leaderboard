import express from "express";
import { createUser, getUsers, claimCredits, getHistory,getUserById } from "../middlewares/middlewares.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", createUser);
router.put("/users/credits", claimCredits);
router.get("/users/history", getHistory);
router.get("/test", (req, res) => {
  res.json({ message: "Test endpoint" });
});

export default router;