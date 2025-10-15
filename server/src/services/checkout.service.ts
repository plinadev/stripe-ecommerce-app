import { db } from "../config/firebase.config";
import { stripe } from "../config/stripe.config";
import { Course } from "../types";

export const createCheckoutSession = async (courseId: string) => {
  const courseRef = db.collection("courses").doc(courseId);
  const courseSnap = await courseRef.get();
  if (!courseSnap.exists) {
    throw new Error("Course not found");
  }
  const course = courseSnap.data() as Course;

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
    success_url: `${process.env.CLIENT_URL}/stripe-checkout?purchaseResult=success`,
    cancel_url: `${process.env.CLIENT_URL}/stripe-checkout?purchaseResult=failure`,
  });

  return session;
};
