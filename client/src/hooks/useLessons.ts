import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { coursesService } from "../services/coursesService";

export const useLessons = (courseId: string) => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 0;
  const limit = Number(searchParams.get("limit")) || 5;
  const sortOrder = (searchParams.get("sort") as "asc" | "desc") || "asc";

  const {
    data: lessons,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["lessons", courseId, page, limit, sortOrder],
    queryFn: () => coursesService.findLessons(courseId, sortOrder, page, limit),
    enabled: !!courseId,
  });

  return {
    lessons,
    isFetching,
    error,
  };
};
