import { useState } from 'react';
import type { Question, GameState } from '../constants/types/hangul';
import { allHangul } from '../constants/hangulData';

export const useHangulGame = (totalQuestions: number = 10) => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    currentQuestionIndex: 0,
    totalQuestions,
    correctAnswers: 0,
    isGameActive: false
  });

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);

  // 랜덤 질문 생성 함수
  const generateQuestion = (): Question => {
    const randomHangul = allHangul[Math.floor(Math.random() * allHangul.length)];
    
    // 질문 타입 랜덤 선택
    const questionTypes = ['name', 'sound'] as const;
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    let question: string;
    let correctAnswer: string;
    let options: string[];
    
    if (questionType === 'name') {
      question = `이 한글의 이름은 무엇인가요? "${randomHangul.character}"`;
      correctAnswer = randomHangul.name;
      
      // 같은 타입의 다른 한글들에서 잘못된 답안 생성
      const sameTypeItems = allHangul.filter(item => 
        item.type === randomHangul.type && item.name !== randomHangul.name
      );
      const wrongAnswers = sameTypeItems
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(item => item.name);
      
      options = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
    } else {
      question = `이 한글의 소리는 무엇인가요? "${randomHangul.character}"`;
      correctAnswer = randomHangul.romanization;
      
      const sameTypeItems = allHangul.filter(item => 
        item.type === randomHangul.type && item.romanization !== randomHangul.romanization
      );
      const wrongAnswers = sameTypeItems
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(item => item.romanization);
      
      options = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
    }
    
    return {
      id: `${Date.now()}-${Math.random()}`,
      hangul: randomHangul,
      question,
      correctAnswer,
      options,
      type: questionType
    };
  };

  // 게임 시작
  const startGame = () => {
    setGameState({
      score: 0,
      currentQuestionIndex: 0,
      totalQuestions,
      correctAnswers: 0,
      isGameActive: true
    });
    setCurrentQuestion(generateQuestion());
    setSelectedAnswer('');
    setShowResult(false);
  };

  // 답안 선택
  const selectAnswer = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === currentQuestion?.correctAnswer;
    
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        score: prev.score + (isCorrect ? 10 : 0),
        correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
      
      // 다음 문제 또는 게임 종료
      if (gameState.currentQuestionIndex + 1 < totalQuestions) {
        setCurrentQuestion(generateQuestion());
        setSelectedAnswer('');
        setShowResult(false);
      } else {
        setGameState(prev => ({ ...prev, isGameActive: false }));
      }
    }, 1500);
  };

  // 게임 재시작
  const restartGame = () => {
    startGame();
  };

  return {
    gameState,
    currentQuestion,
    selectedAnswer,
    showResult,
    startGame,
    selectAnswer,
    restartGame
  };
};
