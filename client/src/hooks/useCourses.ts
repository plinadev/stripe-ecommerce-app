import { useQuery } from "@tanstack/react-query";
import type { Course } from "../types";
import { coursesService } from "../services/coursesService";

export const useCourses = () => {
  const {
    data: courses,
    isFetching,
    error,
  } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: () => coursesService.loadAllCourses(),
  });

  return {
    courses,
    isFetching,
    error,
  };
};
