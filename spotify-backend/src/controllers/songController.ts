import { Request, Response } from "express";
import songModel from "../models/songModel";
import { v2 as cloudinary } from "cloudinary";

const addSong = async (req: Request, res: Response) => {
  try {
    const { name, desc, album } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const imageFile = files?.image?.[0];
    const audioFile = files?.audio?.[0];
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;

    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration: duration,
    };

    const song = new songModel(songData);
    await song.save();
    res.json({ success: true, message: "song added" });
  } catch (error) {
    res.json({ success: false });
  }
};

const listSong = async (req: Request, res: Response) => {
  try {
    const allSongs = await songModel.find({});
    res.json({ success: true, songs: allSongs });
  } catch (error) {
    res.json({ success: false });
  }
};

const removeSong = async (req: Request, res: Response) => {
  try {
    await songModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "song deleted" });
  } catch (error) {}
};

export { addSong, listSong, removeSong };
