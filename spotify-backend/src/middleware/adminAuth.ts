import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AdminJwtPayload {
  email: string;
  role: string;
}

const authAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized as admin" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as AdminJwtPayload;

    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Admins only" });
    }
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default authAdmin;
