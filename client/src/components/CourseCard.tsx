import { useNavigate } from "react-router-dom";
import type { Course } from "../types";
import { useState } from "react";
import { GiSparkles } from "react-icons/gi";
import { PiLayout } from "react-icons/pi";
import { CgShoppingCart } from "react-icons/cg";
import { useAuth } from "../context/useAuth";
import { checkoutService } from "../services/purchaseService";
import { toast } from "react-hot-toast";
export default function CourseCard({ course }: { course: Course }) {
  const { user, loading } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const handleWatchClick = () => {
    navigate(`/courses/${course.url}`);
  };
  const handleBuyCourse = async () => {
    if (!user) return;
    try {
      await checkoutService.startCourseChechoutSession(course.id);
    } catch (error: any) {
      console.error(error.message);
      toast.error("Checkout failed");
    }
  };
  if (loading) return;
  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        {course.iconUrl ? (
          <img
            src={course.iconUrl}
            alt={course.titles.description}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <GiSparkles className="w-16 h-16 text-white opacity-50" />
          </div>
        )}

        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Content */}
      <div className="p-6 h-65 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
            {course.titles.description}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {course.titles.longDescription}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 ">
          <button
            onClick={handleWatchClick}
            className="flex-1 hover:cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-md hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            <PiLayout className="w-4 h-4" />
            Watch
          </button>

          {user && (
            <button
              onClick={handleBuyCourse}
              className="flex-1 flex hover:cursor-pointer items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105"
            >
              <CgShoppingCart className="w-4 h-4" />
              Buy ${course.price}
            </button>
          )}
        </div>
      </div>

      {/* Hover Accent */}
      <div
        className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500 transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
