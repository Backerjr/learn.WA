/**
 * THE VAULT ARCHITECTURE
 * Single Source of Truth for Assessment Ecosystem
 * Persistent Storage Layer with localStorage
 */

import { Question } from './ai';

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  metadata: {
    createdAt: Date;
    lastUsed?: Date;
    avgScore?: number;
    difficulty: string;
    tags: string[];
  };
  coverColor?: string;
}

/**
 * Question Bank - Pool of all individual saved questions
 */
class QuestionBankStore {
  private storageKey = 'rozmo_question_bank';

  getAll(): Question[] {
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) return [];
    
    try {
      const parsed = JSON.parse(stored);
      return parsed.map((q: any) => ({
        ...q,
        createdAt: new Date(q.createdAt)
      }));
    } catch {
      return [];
    }
  }

  saveQuestion(question: Question): void {
    const current = this.getAll();
    const exists = current.find(q => q.id === question.id);
    
    if (!exists) {
      current.push(question);
      localStorage.setItem(this.storageKey, JSON.stringify(current));
    }
  }

  saveBatch(questions: Question[]): void {
    const current = this.getAll();
    const existingIds = new Set(current.map(q => q.id));
    
    const newQuestions = questions.filter(q => !existingIds.has(q.id));
    const updated = [...current, ...newQuestions];
    
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
  }

  remove(id: string): void {
    const current = this.getAll();
    const filtered = current.filter(q => q.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filtered));
  }

  filterByTag(tag: string): Question[] {
    return this.getAll().filter(q => 
      q.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
    );
  }

  search(query: string): Question[] {
    const lowerQuery = query.toLowerCase();
    return this.getAll().filter(q =>
      q.text.toLowerCase().includes(lowerQuery) ||
      q.tags.some(t => t.toLowerCase().includes(lowerQuery))
    );
  }

  clear(): void {
    localStorage.removeItem(this.storageKey);
  }
}

/**
 * Quiz Library - Collection of curated, completed quizzes
 */
class QuizLibraryStore {
  private storageKey = 'rozmo_quiz_library';

  getAll(): Quiz[] {
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) return [];
    
    try {
      const parsed = JSON.parse(stored);
      return parsed.map((q: any) => ({
        ...q,
        metadata: {
          ...q.metadata,
          createdAt: new Date(q.metadata.createdAt),
          lastUsed: q.metadata.lastUsed ? new Date(q.metadata.lastUsed) : undefined
        },
        questions: q.questions.map((ques: any) => ({
          ...ques,
          createdAt: new Date(ques.createdAt)
        }))
      }));
    } catch {
      return [];
    }
  }

  createQuizFromSelection(
    title: string,
    description: string,
    selectedQuestions: Question[],
    tags: string[] = []
  ): Quiz {
    const quiz: Quiz = {
      id: `quiz-${Date.now()}`,
      title,
      description,
      questions: selectedQuestions,
      metadata: {
        createdAt: new Date(),
        difficulty: this.calculateDifficulty(selectedQuestions),
        tags
      },
      coverColor: this.generateCoverColor()
    };

    const current = this.getAll();
    current.push(quiz);
    localStorage.setItem(this.storageKey, JSON.stringify(current));

    return quiz;
  }

  update(quiz: Quiz): void {
    const current = this.getAll();
    const index = current.findIndex(q => q.id === quiz.id);
    
    if (index !== -1) {
      current[index] = quiz;
      localStorage.setItem(this.storageKey, JSON.stringify(current));
    }
  }

  remove(id: string): void {
    const current = this.getAll();
    const filtered = current.filter(q => q.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filtered));
  }

  updateUsage(id: string, score?: number): void {
    const current = this.getAll();
    const quiz = current.find(q => q.id === id);
    
    if (quiz) {
      quiz.metadata.lastUsed = new Date();
      
      if (score !== undefined) {
        const currentAvg = quiz.metadata.avgScore || 0;
        quiz.metadata.avgScore = (currentAvg + score) / 2;
      }
      
      localStorage.setItem(this.storageKey, JSON.stringify(current));
    }
  }

  private calculateDifficulty(questions: Question[]): string {
    if (questions.length === 0) return 'mixed';
    
    const difficulties = questions.map(q => q.difficulty).filter(Boolean);
    const counts = {
      beginner: difficulties.filter(d => d === 'beginner').length,
      intermediate: difficulties.filter(d => d === 'intermediate').length,
      advanced: difficulties.filter(d => d === 'advanced').length
    };
    
    const max = Math.max(counts.beginner, counts.intermediate, counts.advanced);
    
    if (counts.beginner === max) return 'beginner';
    if (counts.intermediate === max) return 'intermediate';
    if (counts.advanced === max) return 'advanced';
    
    return 'mixed';
  }

  private generateCoverColor(): string {
    const colors = [
      '#f4f4f5', // zinc-100
      '#e4e4e7', // zinc-200
      '#d4d4d8', // zinc-300
      '#a1a1aa', // zinc-400
      '#71717a', // zinc-500
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  clear(): void {
    localStorage.removeItem(this.storageKey);
  }
}

// Singleton instances
export const QuestionBank = new QuestionBankStore();
export const QuizLibrary = new QuizLibraryStore();
