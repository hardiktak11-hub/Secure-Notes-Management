import Router from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createnote, deleteNote, getallnotes, getNoteById, pinUnpin, updateNote } from "../controllers/notes.controller.js";

const router = Router();

router.post("/", verifyJWT, createnote);
router.get("/", verifyJWT, getallnotes);
router.get("/:id", verifyJWT, getNoteById);
router.put("/:id", verifyJWT, updateNote);
router.delete("/:id", verifyJWT, deleteNote);
router.patch("/:id/pin", verifyJWT, pinUnpin);
export default router;