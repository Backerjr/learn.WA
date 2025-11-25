// API Client for Learn.WA Backend
// Provides typed functions for all REST endpoints

const rawBase = import.meta.env.VITE_API_URL || '/api';
const API_BASE_URL = rawBase.endsWith('/api') ? rawBase : `${rawBase.replace(/\/$/, '')}/api`;

function buildUrl(endpoint: string) {
  const base = API_BASE_URL.replace(/\/$/, '');
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

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
  enrolled_count?: number;
  created_at?: string;
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
    const response = await fetch(buildUrl(endpoint), {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API request to ${endpoint} failed (${response.status}):`, errorText.substring(0, 200));
      throw new Error(`API Error: ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    const rawBody = await response.text();
    const isJson = contentType.includes('application/json');
    const looksLikeJson = rawBody.trim().startsWith('{') || rawBody.trim().startsWith('[');

    if (!isJson && !looksLikeJson) {
      console.error(`API returned non-JSON response (${response.status}):`, rawBody.substring(0, 200));
      throw new Error(`API Error: ${response.status} - Unexpected response format`);
    }

    try {
      const parsedBody = JSON.parse(rawBody) as T;
      return parsedBody;
    } catch (parseError) {
      console.error('Failed to parse JSON response:', rawBody.substring(0, 200));
      throw new Error('API returned invalid JSON');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
}

function normalizeClassRecord(raw: any): EnglishClass {
  const normalizeDays = (value: any) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      return value.split(',').map((d) => d.trim()).filter(Boolean);
    }
    return [];
  };

  const syllabus = raw.syllabus ?? [];
  const students = raw.students ?? [];
  const enrolled = raw.enrolled ?? raw.enrolled_count ?? 0;

  return {
    ...raw,
    days: normalizeDays(raw.days),
    syllabus,
    students,
    enrolled,
  };
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
  const response = await apiCall<any>(`/classes${query ? `?${query}` : ''}`);
  const list = Array.isArray(response) ? response : response?.classes || [];
  const normalized = list.map(normalizeClassRecord);
  console.log('Courses payload (normalized):', normalized);
  return normalized;
}

/**
 * Get a specific class by ID
 */
export async function getClass(classId: number): Promise<EnglishClass> {
  const response = await apiCall<any>(`/classes/${classId}`);
  const payload = response?.class || response;
  return normalizeClassRecord(payload);
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
