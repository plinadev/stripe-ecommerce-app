import { Request, Response, NextFunction } from "express";
import { auth } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

export interface AuthenticatedRequest extends Request {
  user?: auth.DecodedIdToken;
}

export const authenticateFirebaseUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized - missing token" });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = await getAuth().verifyIdToken(token!);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Firebase authentication error:", error);
    res
      .status(401)
      .json({ message: "Unauthorized - invalid or expired token" });
  }
};
