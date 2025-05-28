import cors from "cors";
import express from "express";
import { errorHandling } from "./middlewares/error-handling";
import { AppError } from "./utils/AppError";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  throw new AppError("Erro de Teste");
});

app.use(errorHandling);

export { app };
