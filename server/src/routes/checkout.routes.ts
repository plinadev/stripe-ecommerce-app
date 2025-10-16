import express, { NextFunction, Request, Response } from "express";
import { createCheckoutSession } from "../services/checkout.service";
import {
  AuthenticatedRequest,
  authenticateFirebaseUser,
} from "../middleware/auth.middleware";

const router = express.Router();
router.post(
  "/checkout",
  authenticateFirebaseUser,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({ message: "courseId is required" });
    }
    const user = req.user;
    const userId = user?.uid;
    if (!userId) {
      return res.status(403).json({ message: "failed to receive user data" });
    }
    try {
      const session = await createCheckoutSession(courseId, userId);
      res
        .status(200)
        .json({ url: session.url, stripeCheckoutSessionId: session.id });
    } catch (error) {
      next(error);
    }
  }
);
export default router;
