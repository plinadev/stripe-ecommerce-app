import { useQuery } from "@tanstack/react-query";
import type { Course } from "../types";
import { coursesService } from "../services/coursesService";

export const useCourseByUrl = (courseUrl: string) => {
  const {
    data: course,
    isFetching,
    error,
  } = useQuery<Course | undefined>({
    queryKey: ["course", courseUrl],
    queryFn: () => coursesService.findCourseByUrl(courseUrl),
    enabled: !!courseUrl,
  });

  return {
    course,
    isFetching,
    error,
  };
};
