import express, { NextFunction, Request, Response } from "express";
import { createCheckoutSession } from "../services/checkout.service";
const router = express.Router();
router.post(
  "/checkout",
  async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "courseId is required" });
    }

    try {
      const session = await createCheckoutSession(courseId);
      res
        .status(200)
        .json({ url: session.url, stripeCheckoutSessionId: session.id });
    } catch (error) {
      next(error);
    }
  }
);
export default router;
