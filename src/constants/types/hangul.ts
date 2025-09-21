// 한글 학습 관련 타입들
export interface HangulItem {
  character: string;        // 한글 자음/모음 (예: 'ㄱ', 'ㅏ')
  romanization: string;     // 로마자 표기 (예: 'g/k')
  name: string;            // 이름 (예: '기역')
  type: 'consonant' | 'vowel';
  example?: string;        // 예시 (예: '가방 (bag)')
}

export interface Question {
  id: string;
  hangul: HangulItem;
  question: string;        // 질문 텍스트
  correctAnswer: string;   // 정답
  options: string[];       // 선택지들
  type: 'name' | 'sound' | 'example'; // 질문 유형
}

export interface GameState {
  score: number;
  currentQuestionIndex: number;
  totalQuestions: number;
  correctAnswers: number;
  isGameActive: boolean;
}
