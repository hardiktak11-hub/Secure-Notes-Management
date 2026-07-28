import express from "express";
import userRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import noteRouter from "./routes/notes.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/notes",noteRouter);

export default app;
