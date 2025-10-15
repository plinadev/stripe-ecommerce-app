import { GiSparkles } from "react-icons/gi";
import CoursesCardList from "../components/CourseCardList";
import Layout from "../components/Layout";
import { useCourses } from "../hooks/useCourses";
import { useState } from "react";

export default function HomePage() {
  const { courses } = useCourses();
  const [activeTab, setActiveTab] = useState<"beginners" | "advanced">(
    "beginners"
  );
  const [processingOngoing, setProcessingOngoing] = useState(false);

  const beginnersCourses = courses?.filter((c) =>
    c.categories.includes("BEGINNER")
  );

  const advancedCourses = courses?.filter((c) =>
    c.categories.includes("ADVANCED")
  );

  const subscribeToPlan = async () => {
    setProcessingOngoing(true);
    try {
      console.log("Subscribed!");
    } finally {
      setProcessingOngoing(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-10 relative">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-3xl opacity-20 -z-10" />

          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            All Courses
          </h1>

          <button
            onClick={subscribeToPlan}
            disabled={processingOngoing}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-md shadow-xl hover:shadow-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {processingOngoing ? (
              <>
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <GiSparkles className="w-5 h-5" />
                Subscribe Now
              </>
            )}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-lg">
            <button
              onClick={() => setActiveTab("beginners")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "beginners"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Beginners
            </button>
            <button
              onClick={() => setActiveTab("advanced")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "advanced"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Advanced
            </button>
          </div>
        </div>

        {/* Course Lists with Fade Animation */}
        <div className="relative">
          <div
            className={`transition-all duration-500 ${
              activeTab === "beginners"
                ? "opacity-100"
                : "opacity-0 absolute inset-0 pointer-events-none"
            }`}
          >
            {activeTab === "beginners" && (
              <CoursesCardList
                courses={beginnersCourses}
                onCourseEdited={() => {}}
              />
            )}
          </div>
          <div
            className={`transition-all duration-500 ${
              activeTab === "advanced"
                ? "opacity-100"
                : "opacity-0 absolute inset-0 pointer-events-none"
            }`}
          >
            {activeTab === "advanced" && (
              <CoursesCardList
                courses={advancedCourses}
                onCourseEdited={() => {}}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
