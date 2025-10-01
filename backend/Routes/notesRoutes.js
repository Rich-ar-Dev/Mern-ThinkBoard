import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote, getNoteById } from "../Controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createNote);
router.get("/:id", getNoteById); // Add this line - missing route!
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;