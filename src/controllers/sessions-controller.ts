import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { compare } from "bcrypt";
import { Request, Response } from "express";
import * as z from "zod";

class SessionsController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z
        .string()
        .trim()
        .email({ message: "E-mail inválido!" })
        .toLowerCase(),
      password: z
        .string()
        .trim()
        .min(6, { message: "A senha deve ter pelo menos 6 dígitos." }),
    });

    const { email, password } = bodySchema.parse(req.body);

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new AppError("E-mail ou senha incorretos!", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("E-mail ou senha incorretos!", 401);
    }

    return res.status(200).json({ email, password });
  }
}

export { SessionsController };
