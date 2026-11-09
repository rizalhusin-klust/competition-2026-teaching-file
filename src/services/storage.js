import { SAMPLE_COURSES } from '../data/sampleCourses';

const STORAGE_KEY = 'eduaudit_pro_courses_2026';
const ACTIVE_COURSE_KEY = 'eduaudit_pro_active_course_id';

/**
 * Get all courses from localStorage or initialize with sample courses
 */
export function getStoredCourses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading courses from storage', e);
  }

  // Fallback to sample courses
  saveStoredCourses(SAMPLE_COURSES);
  return SAMPLE_COURSES;
}

export function saveStoredCourses(courses) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  } catch (e) {
    console.error('Error saving courses to storage', e);
  }
}

export function getActiveCourseId() {
  return localStorage.getItem(ACTIVE_COURSE_KEY) || SAMPLE_COURSES[0].id;
}

export function setActiveCourseId(id) {
  localStorage.setItem(ACTIVE_COURSE_KEY, id);
}

export function updateCourseInStore(updatedCourse) {
  const courses = getStoredCourses();
  const index = courses.findIndex(c => c.id === updatedCourse.id);
  if (index >= 0) {
    courses[index] = updatedCourse;
  } else {
    courses.unshift(updatedCourse);
  }
  saveStoredCourses(courses);
  return courses;
}

export function resetToSampleCourses() {
  saveStoredCourses(SAMPLE_COURSES);
  setActiveCourseId(SAMPLE_COURSES[0].id);
  return SAMPLE_COURSES;
}
