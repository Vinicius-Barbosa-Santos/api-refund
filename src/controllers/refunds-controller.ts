import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
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

    if (!req.user?.id) {
      throw new AppError("Unauthorized", 401);
    }

    const refund = await prisma.refunds.create({
      data: {
        name,
        category,
        amount,
        filename,
        userId: req.user.id,
      },
    });

    res.status(201).json(refund);
  }

  async index(req: Request, res: Response) {
    res.json("OK");
  }
}

export { RefundsController };
