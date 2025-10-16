import { doc, onSnapshot } from "firebase/firestore";
import apiClient from "./apiClient";
import { db } from "../config/firebaseConfig";
interface CheckoutResponse {
  url: string;
  stripeCheckoutSessionId: string;
}
export const checkoutService = {
  startSubscriptionCheckoutSession: async (productId: string) => {
    try {
      const response = await apiClient.post("api/subscribe", {
        productId,
      });
      return response.data as CheckoutResponse;
    } catch (error: any) {
      console.error(
        "Error starting checkout session",
        error.response?.data || error.message
      );
      throw error;
    }
  },
  startCourseChechoutSession: async (courseId: string) => {
    try {
      const response = await apiClient.post("api/checkout", {
        courseId,
      });
      return response.data as CheckoutResponse;
    } catch (error: any) {
      console.error(
        "Error starting checkout session",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  waitForPurchaseCompleted: (purchaseSessionId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!purchaseSessionId) {
        reject(new Error("Invalid purchaseSessionId"));
        return;
      }

      const ref = doc(db, "purchaseSessions", purchaseSessionId);

      const unsubscribe = onSnapshot(
        ref,
        (snapshot) => {
          if (!snapshot.exists()) {
            reject(new Error("Purchase session not found"));
            unsubscribe();
            return;
          }

          const data = snapshot.data();
          if (data.status === "completed") {
            resolve();
            unsubscribe();
          } else if (data.status === "failed") {
            reject(new Error("Purchase failed"));
            unsubscribe();
          }
        },
        (error) => {
          reject(error);
          unsubscribe();
        }
      );
    });
  },
};
