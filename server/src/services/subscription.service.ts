import { stripe } from "../config/stripe.config";
import { Timestamp } from "firebase-admin/firestore";
import { db } from "../config/firebase.config";
import { CheckoutSessionData } from "../types";

export const createSubscriptionSession = async (
  productId: string,
  userId: string
) => {
  const userRef = db.collection("users").doc(userId);
  const userSnap = await userRef.get();

  if (!userSnap.exists) {
    await userRef.set({
      createdAt: Timestamp.now(),
    });
  }

  const userData = userSnap.data() || {};
  let customerId = userData?.stripeCustomerId;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: userData?.email,
      metadata: { firebaseUID: userId },
    });
    customerId = customer.id;
    await userRef.update({ stripeCustomerId: customerId });
  }

  const prices = await stripe.prices.list({
    product: productId,
    active: true,
    limit: 1,
  });

  if (prices.data.length === 0) {
    throw new Error(`No active prices found for product ${productId}`);
  }

  const price = prices.data[0];

  const purchaseSessionRef = db.collection("purchaseSessions").doc();
  const checkoutSessionData: CheckoutSessionData = {
    status: "ongoing",
    created: Timestamp.now(),
    subscriptionId: productId,
    userId,
  };
  await purchaseSessionRef.set(checkoutSessionData);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: price!.id,
        quantity: 1,
      },
    ],
    success_url: `${process.env.CLIENT_URL}/stripe-checkout?purchaseResult=success&ongoingPurchaseSessionId=${purchaseSessionRef.id}`,
    cancel_url: `${process.env.CLIENT_URL}/stripe-checkout?purchaseResult=failure`,
    client_reference_id: purchaseSessionRef.id,
    customer: customerId,
  });

  return session;
};

export const fulfillSubscriptionPurchase = async (
  userId: string,
  subscriptionId: string,
  purchaseSessionId: string,
  customerId: string | null
) => {
  const batch = db.batch();
  const purchaseSessionRef = db
    .collection("purchaseSessions")
    .doc(purchaseSessionId);

  batch.update(purchaseSessionRef, {
    status: "completed",
  });

  const userRef = db.doc(`users/${userId}`);

  batch.set(userRef, { subscriptionId, customerId }, { merge: true });

  return batch.commit();
};
