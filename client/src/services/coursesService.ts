import { app } from "../config/firebaseConfig";
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import type { Course, Lesson } from "../types";

const db = getFirestore(app);

function convertSnaps<T>(docs: QueryDocumentSnapshot<DocumentData>[]): T[] {
  return docs.map((doc) => ({ id: doc.id, ...doc.data() } as T));
}

export const coursesService = {
  saveCourse: async (
    courseId: string,
    changes: Partial<Course>
  ): Promise<void> => {
    const courseRef = doc(db, `courses/${courseId}`);
    await updateDoc(courseRef, changes);
  },

  loadAllCourses: async (): Promise<Course[]> => {
    const q = query(collection(db, "courses"), orderBy("seqNo"));
    const snapshot = await getDocs(q);
    return convertSnaps<Course>(snapshot.docs);
  },

  findCourseByUrl: async (courseUrl: string): Promise<Course | undefined> => {
    const q = query(collection(db, "courses"), where("url", "==", courseUrl));
    const snapshot = await getDocs(q);
    const courses = convertSnaps<Course>(snapshot.docs);
    return courses.length === 1 ? courses[0] : undefined;
  },

  findLessons: async (
    courseId: string,
    sortOrder: "asc" | "desc" = "asc",
    pageNumber = 0,
    pageSize = 3
  ): Promise<Lesson[]> => {
    const lessonsRef = collection(db, `courses/${courseId}/lessons`);
    const q = query(
      lessonsRef,
      orderBy("seqNo", sortOrder),
      startAfter(pageNumber * pageSize),
      limit(pageSize)
    );
    const snapshot = await getDocs(q);
    return convertSnaps<Lesson>(snapshot.docs);
  },
};
