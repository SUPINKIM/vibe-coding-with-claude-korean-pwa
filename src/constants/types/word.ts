// 2단계 단어 게임 관련 타입들
export interface WordItem {
  korean: string;
  english: string;
  romanization: string;
  category: 'numbers' | 'animals' | 'colors' | 'family' | 'body';
  difficulty: number; // 1-3 (1이 쉬움)
}

export interface WordQuestion {
  id: string;
  word: WordItem;
  question: string;
  correctAnswer: string;
  options: string[];
  type: 'korean-to-english' | 'english-to-korean' | 'romanization';
}

export interface WordGameState {
  score: number;
  currentQuestionIndex: number;
  totalQuestions: number;
  correctAnswers: number;
  isGameActive: boolean;
  selectedCategory: string | 'all';
  currentStreak: number;
  bestStreak: number;
}

export type WordCategory = 'all' | 'numbers' | 'animals' | 'colors' | 'family' | 'body';
