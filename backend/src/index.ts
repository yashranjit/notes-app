import express from "express";
import { PORT } from "./config/envConfig.js";
import { authRouter } from "./modules/auth/authRoutes.js";
import { notesRouter } from "./modules/notes/notesRoutes.js";
import cors from "cors";
const app = express();

const port = PORT;

app.use(express.json()); // for parsing body with json

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.get("/land", (req, res) => {
  res.json({ message: "Hello from the Notes App" });
});

app.use("/auth", authRouter);
app.use("/notes", notesRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
