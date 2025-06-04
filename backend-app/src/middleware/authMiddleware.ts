import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    console.warn("Token não encontrado no header Authorization");
    return res.status(401).json({ error: "Access denied. No token" });
  }

  try {
    const decoded: any = verifyToken(token);

    req.user = {
      id: decoded.id_user,
      id_user: decoded.id_user,
      ...decoded,
    };

    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return res.status(401).json({ error: "Access denied. Invalid token" });
  }
};
