import { useParams, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useCourseByUrl } from "../hooks/useCourseByUrl";
import { useLessons } from "../hooks/useLessons";
import { useState } from "react";
import { BiBookOpen, BiChevronDown } from "react-icons/bi";
import { CgLock } from "react-icons/cg";
import { FaGraduationCap } from "react-icons/fa";
import { GiSparkles } from "react-icons/gi";
import LessonCard from "../components/LessonCard";
function CoursePage() {
  const { courseUrl } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 0;

  const { course, isFetching: courseLoading } = useCourseByUrl(courseUrl || "");
  const { lessons, isFetching: lessonsLoading } = useLessons(course?.id || "");
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMore = () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    searchParams.set("page", String(nextPage));
    setSearchParams(searchParams);
    setLoadingMore(false);
  };

  if (courseLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <BiBookOpen className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Course Not Found
          </h2>
          <p className="text-gray-500">
            The course you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const totalDuration =
    lessons?.reduce((acc, lesson) => {
      const [mins, secs] = lesson.duration.split(":").map(Number);
      return acc + mins * 60 + secs;
    }, 0) || 0;

  const totalMinutes = Math.floor(totalDuration / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="relative mb-12 rounded-3xl overflow-hidden shadow-2xl w-170 m-auto">
          {/* Background Image with Overlay */}
          <div className="relative h-90">
            <img
              src={course.iconUrl}
              alt={course.titles.description}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 ">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-4 py-1.5 bg-indigo-600 text-white text-sm font-semibold rounded-full shadow-lg">
                  {course.categories[0]}
                </span>
                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                  {lessons?.length || 0} Lessons
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
                {course.titles.description}
              </h1>
              {course.titles.longDescription && (
                <p className="text-gray-200 text-md max-w-3xl drop-shadow-md">
                  {course.titles.longDescription}
                </p>
              )}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-white border-t border-gray-200">
            <div className="grid grid-cols-3 divide-x divide-gray-200">
              <div className="px-6 py-5 text-center">
                <div className="flex items-center justify-center gap-2 text-indigo-600 mb-1">
                  <BiBookOpen className="w-5 h-5" />
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {lessons?.length || 0}
                </div>
                <div className="text-sm text-gray-500">Lessons</div>
              </div>
              <div className="px-6 py-5 text-center">
                <div className="flex items-center justify-center gap-2 text-purple-600 mb-1">
                  <CgLock className="w-5 h-5" />
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {totalHours > 0
                    ? `${totalHours}h ${remainingMinutes}m`
                    : `${remainingMinutes}m`}
                </div>
                <div className="text-sm text-gray-500">Total Duration</div>
              </div>
              <div className="px-6 py-5 text-center">
                <div className="flex items-center justify-center gap-2 text-pink-600 mb-1">
                  <FaGraduationCap className="w-5 h-5" />
                </div>
                <div className="text-xl font-bold text-gray-900">
                  Certificate
                </div>
                <div className="text-sm text-gray-500">Upon Completion</div>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <GiSparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Course Content</h2>
          </div>

          {(lessonsLoading || loadingMore) && (
            <div className="flex justify-center items-center mb-6">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
            </div>
          )}

          {/* Lessons Grid */}
          <div className="space-y-4 mb-8">
            {lessons?.map((lesson, index) => (
              <LessonCard key={lesson.id} lesson={lesson} index={index} />
            ))}
          </div>

          {/* Load More Button */}
          <button
            onClick={loadMore}
            disabled={lessonsLoading || loadingMore}
            className="w-full group relative bg-white hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 text-gray-900 hover:text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-gray-200 hover:border-transparent overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loadingMore ? (
                <>
                  <div className="w-5 h-5 border-3 border-current border-t-transparent rounded-full animate-spin" />
                  Loading more lessons...
                </>
              ) : (
                <>
                  <BiChevronDown className="w-5 h-5 group-hover:animate-bounce" />
                  Load More Lessons
                </>
              )}
            </span>

            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default CoursePage;
