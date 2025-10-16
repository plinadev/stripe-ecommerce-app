import { Timestamp } from "firebase-admin/firestore";

export type CheckoutSessionData = {
  status: "ongoing" | "failure" | "completed";
  created: Timestamp;
  courseId: string;
  userId: string;
};
