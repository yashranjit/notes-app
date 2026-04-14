import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.js";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "./notesController.js";

const notesRouter = Router();

notesRouter.use(authMiddleware);

notesRouter.post("/", createNote);
notesRouter.get("/", getNotes);
notesRouter.get("/:id", getNoteById);
notesRouter.put("/:id", updateNote);
notesRouter.delete("/:id", deleteNote);

export { notesRouter };
