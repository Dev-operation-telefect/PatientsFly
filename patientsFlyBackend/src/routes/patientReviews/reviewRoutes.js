import { Router } from "express";
import upload  from "../../middleware/multer.js";
import { list, getOne, create, update, remove, removeAll } from "../../controller/patientReview/reviewController.js";

const router = Router();

// fields: profilePic (single), image (single)
const uploader = upload.fields([
  { name: "profilePic", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);

router.get("/", list);
router.get("/:id", getOne);
router.post("/", uploader, create);
router.put("/:id", uploader, update);
router.delete("/", removeAll);      // Delete ALL (use with confirmation)
router.delete("/:id", remove);      // Delete ONE

export default router;
