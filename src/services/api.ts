// API Client for Learn.WA Backend
// Provides typed functions for all REST endpoints

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Types
export interface EnglishClass {
  id: number;
  name: string;
  level: string;
  teacher: string;
  days: string[];
  start_time: string;
  end_time: string;
  capacity: number;
  syllabus: string[];
  students: string[];
  enrolled: number;
}

export interface CreateClassRequest {
  name: string;
  level: string;
  teacher: string;
  days: string | string[];
  start_time: string;
  end_time: string;
  capacity: number;
  syllabus?: string[];
}

export interface EnrollStudentRequest {
  student_name: string;
}

export interface ApiError {
  error: string;
  [key: string]: any;
}

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const error: ApiError = await response.json();
        throw new Error(error.error || `API Error: ${response.status}`);
      } else {
        // Log HTML error for debugging
        const text = await response.text();
        console.error(`API returned non-JSON response (${response.status}):`, text.substring(0, 200));
        throw new Error(`API Error: ${response.status} - Expected JSON but received HTML`);
      }
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
}

// API Functions

/**
 * Health check endpoint
 */
export async function checkHealth(): Promise<{ status: string; message: string }> {
  return apiCall('/health');
}

/**
 * Get all classes with optional filtering
 */
export async function getClasses(filters?: {
  level?: string;
  teacher?: string;
}): Promise<EnglishClass[]> {
  const params = new URLSearchParams();
  if (filters?.level) params.append('level', filters.level);
  if (filters?.teacher) params.append('teacher', filters.teacher);
  
  const query = params.toString();
  return apiCall(`/classes${query ? `?${query}` : ''}`);
}

/**
 * Get a specific class by ID
 */
export async function getClass(classId: number): Promise<EnglishClass> {
  return apiCall(`/classes/${classId}`);
}

/**
 * Create a new class
 */
export async function createClass(
  classData: CreateClassRequest
): Promise<EnglishClass> {
  return apiCall('/classes', {
    method: 'POST',
    body: JSON.stringify(classData),
  });
}

/**
 * Enroll a student in a class
 */
export async function enrollStudent(
  classId: number,
  studentData: EnrollStudentRequest
): Promise<{ message: string; class: EnglishClass }> {
  return apiCall(`/classes/${classId}/enroll`, {
    method: 'POST',
    body: JSON.stringify(studentData),
  });
}

/**
 * Get all students enrolled in a class
 */
export async function getClassStudents(classId: number): Promise<{
  class_id: number;
  class_name: string;
  students: string[];
  enrolled: number;
  capacity: number;
}> {
  return apiCall(`/classes/${classId}/students`);
}

/**
 * Get all available class levels
 */
export async function getLevels(): Promise<string[]> {
  return apiCall('/levels');
}

/**
 * Create multiple classes in bulk
 */
export async function bulkCreateClasses(
  classes: CreateClassRequest[]
): Promise<{ message: string; classes: EnglishClass[] }> {
  return apiCall('/classes/bulk', {
    method: 'POST',
    body: JSON.stringify(classes),
  });
}

export default {
  checkHealth,
  getClasses,
  getClass,
  createClass,
  enrollStudent,
  getClassStudents,
  getLevels,
  bulkCreateClasses,
};
