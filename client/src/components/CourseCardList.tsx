import { GiSparkles } from "react-icons/gi";
import type { Course } from "../types";
import CourseCard from "./CourseCard";

export default function CoursesCardList({
  courses,
  onCourseEdited,
}: {
  courses?: Course[];
  onCourseEdited?: () => void;
}) {
  if (!courses || courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
          <GiSparkles className="w-12 h-12 text-indigo-400" />
        </div>
        <p className="text-gray-500 text-lg font-medium">
          No courses available yet
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Check back soon for new content!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} onEdit={onCourseEdited} />
      ))}
    </div>
  );
}
