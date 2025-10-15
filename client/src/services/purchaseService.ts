import apiClient from "./apiClient";

export const checkoutService = {
  startCourseChechoutSession: async (courseId: string) => {
    try {
      const response = await apiClient.post("api/purchase", {
        courseId,
      });
    } catch (error: any) {
      console.error(
        "Error starting checkout session",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};
