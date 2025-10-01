import Note from "../Models/Note.js";


export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createNote(req, res) {
    try {

        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }
        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json({ message: "Note created successfully", note: newNote });
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export async function updateNote(req, res) {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note updated successfully", note: updatedNote });
    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({ message: "internal server error" });
    }
}
 
export async function deleteNote(req, res) {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({ message: "internal server error" });
    }
}

export async function getNoteById(req, res) {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteById controller", error);
        res.status(500).json({ message: "internal server error" });
    }
}