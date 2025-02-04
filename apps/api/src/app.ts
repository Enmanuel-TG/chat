import express, { Request, Response } from "express";
import { PORT } from "../utilities/consts,utilities";
import cors from "cors";
import { router as authRouter } from "./auth/auth.router";


const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hi, world!");
});
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
