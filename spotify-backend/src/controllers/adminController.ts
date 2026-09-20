import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { email, role: "admin" },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" },
      );
      return res.json({ success: true, token });
    }

    res.json({ success: false, message: "Invalid admin credentials" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error logging in" });
  }
};

export { adminLogin };
