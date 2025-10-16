import express, { NextFunction, Response } from "express";
import { stripe } from "../config/stripe.config";
import { onCheckoutSessionCompleted } from "../services/checkout.service";

const router = express.Router();
router.post(
  "/stripe-webhooks",
  express.raw({ type: "application/json" }),
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const signature = req.headers["stripe-signature"];
      const event = stripe.webhooks.constructEvent(
        req.body,
        signature!,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        await onCheckoutSessionCompleted(session);
      }
      res.json({ received: true });
    } catch (error: any) {
      console.log("Error processing webhook event: ", error);
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }
  }
);
export default router;
