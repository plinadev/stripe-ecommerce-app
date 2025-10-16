import { Timestamp } from "firebase-admin/firestore";
import { db } from "../config/firebase.config";
import { stripe } from "../config/stripe.config";
import { CheckoutSessionData, Course } from "../types";
import Stripe from "stripe";

export const createCheckoutSession = async (
  courseId: string,
  userId: string
) => {
  const courseRef = db.collection("courses").doc(courseId);
  const courseSnap = await courseRef.get();
  if (!courseSnap.exists) {
    throw new Error("Course not found");
  }
  const course = { id: courseSnap.id, ...courseSnap.data() } as Course;

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

  const purchaseSession = db.collection("purchaseSessions").doc();
  const checkoutSessionData: CheckoutSessionData = {
    status: "ongoing",
    created: Timestamp.now(),
    courseId: course.id,
    userId,
  };
  purchaseSession.set(checkoutSessionData);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: course.titles.description },
          unit_amount: course.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/stripe-checkout?purchaseResult=success&ongiongPurchaseSessionId=${purchaseSession.id}`,
    cancel_url: `${process.env.CLIENT_URL}/stripe-checkout?purchaseResult=failure`,
    client_reference_id: purchaseSession.id,

    customer: customerId,
  });

  return session;
};

export const onCheckoutSessionCompleted = async (
  session: Stripe.Checkout.Session
) => {
  const purchaseSessionId = session.client_reference_id;
  if (!purchaseSessionId) {
    throw new Error("Missing purchase session ID in checkout session");
  }
  const purchaseSessionRef = db
    .collection("purchaseSessions")
    .doc(purchaseSessionId);

  const purchaseSessionSnap = await purchaseSessionRef.get();
  const { userId, courseId } =
    purchaseSessionSnap.data() as CheckoutSessionData;
  if (courseId) {
    const customerId = session.customer as string | null;
    await fulfillCoursePurchase(
      userId,
      courseId,
      purchaseSessionId,
      customerId
    );
  }
};

const fulfillCoursePurchase = async (
  userId: string,
  courseId: string,
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

  const userCoursesOwnedRef = db.doc(
    `users/${userId}/coursesOwned/${courseId}`
  );
  batch.create(userCoursesOwnedRef, {});

  const userRef = db.doc(`users/${userId}`);
  if (customerId) {
    batch.set(userRef, { stripeCustomerId: customerId }, { merge: true });
  }

  return batch.commit();
};
