import express, { Request, Response } from  "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hi, world!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
