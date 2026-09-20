import express from "express";

import { chatSubmit } from "../controllers/chatController.js";

const router = express.Router();

router.post("/chat", chatSubmit);

export default router;
