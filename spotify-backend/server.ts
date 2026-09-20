import express from "express";
import cors from "cors";
import "dotenv/config";
import songRouter from "./src/routes/songRoute";
import albumRouter from "./src/routes/albumRoute";
import userRouter from "./src/routes/userRoute";
import adminRouter from "./src/routes/adminRoute";
import connectDB from "./src/config/mongodb";
import connectCloudinary from "./src/config/cloudinary";

//app config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(cors());
app.use(express.json());

//initializing routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.status(200).send("api working");
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
