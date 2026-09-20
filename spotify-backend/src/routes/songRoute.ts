import { addSong, listSong, removeSong } from "../controllers/songController";
import express from "express";
import upload from "../middleware/multer";
import authAdmin from "../middleware/adminAuth";

const songRouter = express.Router();

songRouter.post(
  "/add",
  authAdmin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  addSong,
);
songRouter.get("/list", listSong);
songRouter.post("/remove", authAdmin, removeSong);

export default songRouter;
