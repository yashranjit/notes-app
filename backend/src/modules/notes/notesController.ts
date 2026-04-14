import { Response } from "express";
import { db } from "../../db/index.js";
import { notes } from "../../db/schema.js";
import { AuthRequest } from "../../middleware/auth.js";
import { desc, eq } from "drizzle-orm";
import { noteSchema } from "../../utils/validationSchemas.js";

export const createNote = async (req: AuthRequest, res: Response) => {
  const parsedBody = noteSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res.json({
      message: "Invalid input",
      error: parsedBody.error.flatten(),
    });
  }
  const { title, content } = parsedBody.data;
  try {
    const [note] = await db
      .insert(notes)
      .values({ title, content, userId: req.userId! })
      .returning();
    return res.json(note);
  } catch (err) {
    return res.json({ message: "Error creating note" });
  }
};

export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const userNotes = await db
      .select()
      .from(notes)
      .where(eq(notes.userId, req.userId!))
      .orderBy(desc(notes.createdAt));
    return res.json(userNotes);
  } catch (err) {
    return res.json({ message: "Error fetching notes" });
  }
};

export const getNoteById = async (req: AuthRequest, res: Response) => {
  try {
    const [note] = await db
      .select()
      .from(notes)
      .where(eq(notes.id, req.params.id as string));
    if (!note) {
      return res.json({ message: "Note not found" });
    }

    if (note.userId !== req.userId) {
      return res.json({ message: "Unauthorized " });
    }
    return res.json(note);
  } catch (err) {
    return res.json({ message: "Error fetching note" });
  }
};

export const updateNote = async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body;

  try {
    const [existing] = await db
      .select()
      .from(notes)
      .where(eq(notes.id, req.params.id as string));
    if (!existing) {
      return res.json({ message: "Note not found" });
    }
    if (existing.userId !== req.userId) {
      return res.json({ message: "Unauthorized" });
    }
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "At least one field (title or content) must be provided",
      });
    }
    const [updated] = await db
      .update(notes)
      .set(updateData)
      .where(eq(notes.id, req.params.id as string))
      .returning();
    return res.json({ message: "Update successful", note: updated });
  } catch (err) {
    return res.json({ message: "Error updating" });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const [existing] = await db
      .select()
      .from(notes)
      .where(eq(notes.id, req.params.id as string));
    if (!existing) {
      return res.json({ message: "Note not found" });
    }

    if (existing.userId !== req.userId) {
      return res.json({ message: "Unauthorized" });
    }
    await db.delete(notes).where(eq(notes.id, req.params.id as string));
    return res.json({ message: "Deleted successfully" });
  } catch (err) {
    return res.json({ message: "Error deleting note" });
  }
};
