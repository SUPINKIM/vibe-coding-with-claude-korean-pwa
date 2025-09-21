import { useState } from 'react';
import type { WordItem, WordQuestion, WordGameState, WordCategory } from '../constants/types/word';
import { wordsData } from '../constants/wordsData';

export const useWordGame = (totalQuestions: number = 15) => {
  const [gameState, setGameState] = useState<WordGameState>({
    score: 0,
    currentQuestionIndex: 0,
    totalQuestions,
    correctAnswers: 0,
    isGameActive: false,
    selectedCategory: 'all',
    currentStreak: 0,
    bestStreak: 0,
  });

  const [currentQuestion, setCurrentQuestion] = useState<WordQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);
  const [availableCategories] = useState<{ [key: string]: string }>({
    all: 'All Categories',
    numbers: 'Numbers (숫자)',
    animals: 'Animals (동물)',
    colors: 'Colors (색깔)',
    family: 'Family (가족)',
    body: 'Body (몸)',
  });

  // 카테고리별 단어 가져오기
  const getWordsByCategory = (category: WordCategory): WordItem[] => {
    if (category === 'all') {
      return wordsData.all;
    }
    return wordsData[category] || [];
  };

  // 랜덤 질문 생성
  const generateQuestion = (category: WordCategory = 'all'): WordQuestion => {
    const words = getWordsByCategory(category);
    if (words.length === 0) return generateQuestion('all');

    const randomWord = words[Math.floor(Math.random() * words.length)];
    
    // 질문 타입 랜덤 선택
    const questionTypes = ['korean-to-english', 'english-to-korean', 'romanization'] as const;
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    let question: string;
    let correctAnswer: string;
    let options: string[];
    
    switch (questionType) {
      case 'korean-to-english':
        question = randomWord.korean;
        correctAnswer = randomWord.english;
        options = generateOptions(randomWord.english, 'english', words);
        break;
        
      case 'english-to-korean':
        question = randomWord.english;
        correctAnswer = randomWord.korean;
        options = generateOptions(randomWord.korean, 'korean', words);
        break;
        
      case 'romanization':
        question = randomWord.korean;
        correctAnswer = randomWord.romanization;
        options = generateOptions(randomWord.romanization, 'romanization', words);
        break;
    }
    
    return {
      id: `${Date.now()}-${Math.random()}`,
      word: randomWord,
      question,
      correctAnswer,
      options: shuffleArray(options),
      type: questionType,
    };
  };

  // 선택지 생성
  const generateOptions = (correctAnswer: string, type: 'english' | 'korean' | 'romanization', allWords: WordItem[]): string[] => {
    const options = [correctAnswer];
    
    const otherWords = allWords.filter(w => {
      switch (type) {
        case 'english': return w.english !== correctAnswer;
        case 'korean': return w.korean !== correctAnswer;
        case 'romanization': return w.romanization !== correctAnswer;
      }
    });

    // 같은 카테고리에서 우선 선택, 부족하면 다른 카테고리에서
    while (options.length < 4 && otherWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherWords.length);
      const randomWord = otherWords[randomIndex];
      
      let optionText: string;
      switch (type) {
        case 'english': optionText = randomWord.english; break;
        case 'korean': optionText = randomWord.korean; break;
        case 'romanization': optionText = randomWord.romanization; break;
      }
      
      if (!options.includes(optionText)) {
        options.push(optionText);
      }
      otherWords.splice(randomIndex, 1);
    }

    return options;
  };

  // 배열 셞플
  const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 게임 시작
  const startGame = (category: WordCategory = 'all') => {
    console.log('Starting word game with category:', category);
    
    setGameState({
      score: 0,
      currentQuestionIndex: 0,
      totalQuestions,
      correctAnswers: 0,
      isGameActive: true,
      selectedCategory: category,
      currentStreak: 0,
      bestStreak: parseInt(localStorage.getItem('wordGameBestStreak') || '0'),
    });
    
    setCurrentQuestion(generateQuestion(category));
    setSelectedAnswer('');
    setShowResult(false);
  };

  // 답안 선택
  const selectAnswer = (answer: string) => {
    if (showResult || !currentQuestion) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    setTimeout(() => {
      setGameState(prev => {
        const newStreak = isCorrect ? prev.currentStreak + 1 : 0;
        const newBestStreak = Math.max(prev.bestStreak, newStreak);
        
        // 베스트 기록 저장
        if (newBestStreak > prev.bestStreak) {
          localStorage.setItem('wordGameBestStreak', newBestStreak.toString());
        }
        
        return {
          ...prev,
          score: prev.score + (isCorrect ? (10 + Math.min(prev.currentStreak * 2, 20)) : 0), // 연속 정답 보너스
          correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          currentStreak: newStreak,
          bestStreak: newBestStreak,
        };
      });
      
      // 다음 문제 또는 게임 종료
      if (gameState.currentQuestionIndex + 1 < totalQuestions) {
        setCurrentQuestion(generateQuestion(gameState.selectedCategory as WordCategory));
        setSelectedAnswer('');
        setShowResult(false);
      } else {
        setGameState(prev => ({ ...prev, isGameActive: false }));
      }
    }, 1500);
  };

  // 게임 재시작
  const restartGame = () => {
    startGame(gameState.selectedCategory as WordCategory);
  };

  // 카테고리 변경
  const changeCategory = (category: WordCategory) => {
    setGameState(prev => ({ ...prev, selectedCategory: category }));
  };

  return {
    gameState,
    currentQuestion,
    selectedAnswer,
    showResult,
    availableCategories,
    setGameState,
    startGame,
    selectAnswer,
    restartGame,
    changeCategory,
    getWordsByCategory,
  };
};
