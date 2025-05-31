import cors from "cors";
import express, { response } from "express";
import { errorHandling } from "./middlewares/error-handling";
import { AppError } from "./utils/AppError";
import { z } from "zod";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const bodySchema = z.object({
    age: z.number().min(18),
  });

  const { age } = bodySchema.parse(req.body);
  response.send("Hello World!");
});

app.use(errorHandling);

export { app };
