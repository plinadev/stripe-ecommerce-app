import apiClient from "./apiClient";
interface CheckoutResponse {
  url: string;
  stripeCheckoutSessionId: string;
}
export const checkoutService = {
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
};
