import express from "express";
import {
  addAlbum,
  listAlbum,
  removeAlbum,
} from "../controllers/albumController";
import upload from "../middleware/multer";
import authAdmin from "../middleware/adminAuth";

const albumRouter = express.Router();

albumRouter.post("/add", authAdmin, upload.single("image"), addAlbum);
albumRouter.get("/list", listAlbum);
albumRouter.post("/remove", authAdmin, removeAlbum);

export default albumRouter;
