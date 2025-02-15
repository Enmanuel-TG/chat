import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { ExtendedRequest } from "../types.d";
import { TOKEN_SECRET } from "../../utilities/consts.utility";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json(["Token not provided"]);
  }
  try {
    const decoded = jwt.verify(token, TOKEN_SECRET) as unknown as {
      id: string;
      iat: number;
      exp: number;
    };
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json(["Token expired"]);
    }
    (req as ExtendedRequest).userId = Number(decoded.id);
    return next();
  } catch (error) {
    return res.status(401).json(["Invalid token."]);
  }
};

export default validateToken;
