import { Request, Response } from "express";
import albumModel from "../models/albumModel";
import { v2 as cloudinary } from "cloudinary";
import "multer";

const addAlbum = async (req: Request, res: Response) => {
  try {
    const { name, desc, bgColor } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Image file is required" });
    }
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const albumData = {
      name,
      desc,
      bgColor,
      image: imageUpload.secure_url,
    };

    const album = new albumModel(albumData);
    await album.save();
    res.json({ success: true, message: "Album added" });
  } catch (error) {
    res.json({ success: false });
  }
};

const listAlbum = async (req: Request, res: Response) => {
  try {
    const allAlbums = await albumModel.find({});
    res.json({ success: true, albums: allAlbums });
  } catch (error) {
    res.json({ success: false });
  }
};

const removeAlbum = async (req: Request, res: Response) => {
  try {
    await albumModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "album deleted" });
  } catch (error) {
    res.json({ success: false });
  }
};

export { addAlbum, listAlbum, removeAlbum };
