import { Response, Request } from "express";
import { ExtendedRequest } from "../types.d";
import { prisma } from "../../utilities/prisma.utility";
import { createAccessToken } from "../../utilities/jwt.utility";
import { NAME_TOKEN } from "../../utilities/consts.utility";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {

  const { name, email, number, password } = req.body;
  const passwordhash = await bcrypt.hash(password, 10);
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
            password: passwordhash,
          },
        });
      const token = await createAccessToken({ id: user.id });
      return res
        .cookie(NAME_TOKEN, token, {
          httpOnly: true,
          secure: true,
        })
        .status(200)
        .json({
          message: "Register successfully.",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phoneNumber: user.number
          },
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userFound = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, userFound!.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = await createAccessToken({ id: userFound!.id });
    return res
      .cookie(NAME_TOKEN, token, {
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .json({
        message: "Login successfully.",
        user: {
          id: userFound.id,
          name: userFound.name,
          email: userFound.email,
          phoneNumber: userFound.number,
        },
      });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const logout = (_req: Request, res: Response) => {
  try {
    res.cookie(NAME_TOKEN, "", {
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({ message: "Logout successfully." });
  } catch (error) {
    return res.status(500).json(["Error internal server."]);
  }
};

export const profile = async (ExtendedRequest: ExtendedRequest, res: Response) => {
  const userId = ExtendedRequest.userId;
  try {
    const userFound = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "Profile successfully.",
      user: {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,
        phoneNumber: userFound.number,
      },
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};