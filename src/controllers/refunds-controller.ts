import { Request, Response } from "express";
import * as z from "zod";

const RefundsCategory = z.enum([
  "food",
  "others",
  "services",
  "transport",
  "accommodation",
]);

class RefundsController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(2, { message: "Nome é obrigatório" }),
      category: RefundsCategory,
      amount: z.number().positive(),
      filename: z.string().min(20),
    });

    const { name, category, amount, filename } = bodySchema.parse(req.body);

    res.status(201).json({ name, category, amount, filename });
  }
}

export { RefundsController };
