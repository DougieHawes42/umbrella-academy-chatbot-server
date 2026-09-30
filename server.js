import cors from "cors";
import express from "express";

import chatRoutes from "./routes/chatRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
