import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./src/routes/authRoutes.js";
import channelsRoutes from "./src/routes/channelsRoutes.js";
import settingsRoutes from "./src/routes/settingsRoutes.js";

dotenv.config();
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  return res.send("Hello here is your server");
});
app.use("/api/auth", authRoutes);
app.use("/api/channels", channelsRoutes);
app.use("/api/settings", settingsRoutes);
const server = http.createServer(app);
app.listen(PORT, () => {
  console.log(`Backend is up at port ${PORT}.`);
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Established a connection with the database"))
    .catch((err) => console.log("Error connecting to database", err));
});
