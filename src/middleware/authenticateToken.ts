import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export function authMiddleware(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const secret = process.env.JWT_SECRET;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid Authorization header" });
  }

  try {
    const payload = jwt.verify(token, secret!);
    req.user = payload; // set the decoded payload as the user property on the Request object
    next(); // call the next middleware function
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
