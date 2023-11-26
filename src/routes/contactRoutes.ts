import { Router } from "express";
import { ContactController }from "../controller/contactController"
const router = Router();

router.post("/", ContactController.postContacts)
router.get("/", ContactController.getContacts)
router.get("/:id", ContactController.getContactById)
router.patch("/:id", ContactController.patchContacts)
router.delete("/:id", ContactController.deleteContacts)

export default router;