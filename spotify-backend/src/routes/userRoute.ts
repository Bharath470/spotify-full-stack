import express from "express";
import { registerUser, loginUser } from "../controllers/userController";
import authUser from "../middleware/auth";
import userModel from "../models/userModel";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Protected example: authUser runs first, only proceeds if the token checks out
userRouter.get("/profile", authUser, async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: "Error fetching profile" });
  }
});

export default userRouter;
