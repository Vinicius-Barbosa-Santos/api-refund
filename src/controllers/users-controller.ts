import { prisma } from "@/database/prisma";
import { UserRole } from "@prisma/client";
import { Request, Response } from "express";
import { hash } from "bcrypt";
import * as z from "zod";

class UsersController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(2, { message: "Nome é obrigatório" }),
      email: z
        .string()
        .trim()
        .email({ message: "E-mail inválido!" })
        .toLowerCase(),
      password: z
        .string()
        .min(6, { message: "A senha deve ter pelo menos 6 dígitos." }),
      role: z
        .enum([UserRole.employee, UserRole.manager])
        .default(UserRole.employee),
    });

    const { name, email, password, role } = bodySchema.parse(req.body);

    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });

    if (userWithSameEmail) {
      throw new Error("E-mail ja cadastrado!");
    }

    const hashedPassword = await hash(password, 8);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return res.status(201).json();
  }
}

export { UsersController };
