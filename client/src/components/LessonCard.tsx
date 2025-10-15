import { useState } from "react";
import type { Lesson } from "../types";
import { BiPlayCircle } from "react-icons/bi";
import { CgLock } from "react-icons/cg";

export default function LessonCard({
  lesson,
  index,
}: {
  lesson: Lesson;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-indigo-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-4">
        {/* Lesson Number */}
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-300 ${
            isHovered
              ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg"
              : "bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700"
          }`}
        >
          {lesson.seqNo}
        </div>

        {/* Lesson Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 mb-1">
            {lesson.description}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CgLock className="w-4 h-4" />
            <span>{lesson.duration}</span>
          </div>
        </div>

        {/* Play Button */}
        <button
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isHovered
              ? "bg-indigo-600 text-white shadow-lg scale-110"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          <BiPlayCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Progress bar (decorative) */}
      <div
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-b-xl transition-all duration-500 ${
          isHovered ? "w-full" : "w-0"
        }`}
      />
    </div>
  );
}
