import { Request, Response } from "express";
import { prisma } from "../../utilities/prisma.utilities";

export const register = async (req: Request, res: Response) => {

    const { name, email, number, password } = req.body;
    try {
        const userFound = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (userFound) {
          return res.status(400).json({ message: "User already exists" });
        }

        const user = await prisma.user.create({
          data: {
            name,
            email,
            number,
            password,
          },
        });

        return res.status(201).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
};