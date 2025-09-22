import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { type SentenceItem, allSentencesData } from '../constants/sentenceData';
import '../styles/SentenceGame.css';

interface GameState {
  score: number;
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  isAnswered: boolean;
  showResult: boolean;
  streak: number;
  maxStreak: number;
  incorrectAnswers: number;
}

const SentenceGame: React.FC = () => {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    currentQuestionIndex: 0,
    selectedAnswer: null,
    isAnswered: false,
    showResult: false,
    streak: 0,
    maxStreak: 0,
    incorrectAnswers: 0,
  });

  const [questions, setQuestions] = useState<SentenceItem[]>([]);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(0);

  // 게임 초기화
  const initializeGame = useCallback(() => {
    // 20개 문장을 랜덤으로 선택
    const shuffledSentences = [...allSentencesData].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledSentences.slice(0, 20);
    setQuestions(selectedQuestions);
    
    setGameState({
      score: 0,
      currentQuestionIndex: 0,
      selectedAnswer: null,
      isAnswered: false,
      showResult: false,
      streak: 0,
      maxStreak: 0,
      incorrectAnswers: 0,
    });
  }, []);

  // 현재 문제의 옵션 생성
  const generateOptions = useCallback((currentSentence: SentenceItem) => {
    // 다른 문장들에서 잘못된 답 3개 가져오기
    const otherSentences = allSentencesData.filter(item => item.korean !== currentSentence.korean);
    const wrongOptions = otherSentences
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(item => item.english);

    // 정답과 함께 섞기
    const allOptions = [currentSentence.english, ...wrongOptions];
    const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
    
    // 정답의 인덱스 찾기
    const correctIndex = shuffledOptions.findIndex(option => option === currentSentence.english);
    
    setCurrentOptions(shuffledOptions);
    setCorrectAnswerIndex(correctIndex);
  }, []);

  // 게임 시작
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // 새 문제 로드
  useEffect(() => {
    if (questions.length > 0 && gameState.currentQuestionIndex < questions.length && !gameState.showResult) {
      const currentQuestion = questions[gameState.currentQuestionIndex];
      generateOptions(currentQuestion);
    }
  }, [questions, gameState.currentQuestionIndex, gameState.showResult, generateOptions]);

  // 답안 선택
  const handleAnswerSelect = (selectedIndex: number) => {
    if (gameState.isAnswered) return;

    const isCorrect = selectedIndex === correctAnswerIndex;
    const newStreak = isCorrect ? gameState.streak + 1 : 0;
    const newMaxStreak = Math.max(gameState.maxStreak, newStreak);

    setGameState(prev => ({
      ...prev,
      selectedAnswer: selectedIndex,
      isAnswered: true,
      score: isCorrect ? prev.score + 10 : prev.score,
      streak: newStreak,
      maxStreak: newMaxStreak,
      incorrectAnswers: isCorrect ? prev.incorrectAnswers : prev.incorrectAnswers + 1,
    }));

    // 2초 후 다음 문제로
    setTimeout(() => {
      if (gameState.currentQuestionIndex + 1 >= questions.length) {
        setGameState(prev => ({ ...prev, showResult: true }));
      } else {
        setGameState(prev => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          selectedAnswer: null,
          isAnswered: false,
        }));
      }
    }, 2000);
  };

  // 게임 재시작
  const handleRestart = () => {
    initializeGame();
  };

  // 결과 화면
  if (gameState.showResult) {
    const totalQuestions = questions.length;
    const accuracy = Math.round((gameState.score / (totalQuestions * 10)) * 100);
    
    let resultMessage = '';
    let resultEmoji = '';
    
    if (accuracy >= 90) {
      resultMessage = t('stage3.results.excellent');
      resultEmoji = '🏆';
    } else if (accuracy >= 75) {
      resultMessage = t('stage3.results.great');
      resultEmoji = '🎉';
    } else if (accuracy >= 60) {
      resultMessage = t('stage3.results.good');
      resultEmoji = '👍';
    } else {
      resultMessage = t('stage3.results.keepTrying');
      resultEmoji = '💪';
    }

    return (
      <div className="sentence-game">
        <div className="game-result">
          <div className="result-emoji">{resultEmoji}</div>
          <h2 className="result-title">{resultMessage}</h2>
          
          <div className="result-stats">
            <div className="stat-item">
              <span className="stat-label">{t('results.scoreText')}</span>
              <span className="stat-value">{gameState.score}/{totalQuestions * 10}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">{t('results.accuracy')}</span>
              <span className="stat-value">{accuracy}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">{t('game.streak')}</span>
              <span className="stat-value">{gameState.maxStreak}</span>
            </div>
          </div>
          
          <div className="result-buttons">
            <button className="result-btn primary" onClick={handleRestart}>
              {t('stage3.results.restart')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 게임 로딩 중
  if (questions.length === 0) {
    return (
      <div className="sentence-game">
        <div className="loading">
          <div className="loading-spinner">🇰🇷</div>
          <p>{t('stage3.game.loading', 'Loading...')}</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[gameState.currentQuestionIndex];
  const progress = ((gameState.currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="sentence-game">
      {/* 게임 헤더 */}
      <div className="game-header">
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="progress-text">
            <span>{t('stage3.game.question')} {gameState.currentQuestionIndex + 1}</span>
            <span>{questions.length}</span>
          </div>
        </div>
        
        <div className="game-stats">
          <div className="stat-item">
            <span className="stat-icon">⭐</span>
            <span>{gameState.score}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🔥</span>
            <span>{gameState.streak}</span>
          </div>
        </div>
      </div>

      {/* 문제 카드 */}
      <div className="question-card">
        <div className="question-type">
          {t('stage3.game.whatSentenceMeaning')}
        </div>
        
        <div className="sentence-display">
          <div className="korean-sentence">
            {currentQuestion.korean}
          </div>
          <div className="romanization">
            [{currentQuestion.romanization}]
          </div>
        </div>
      </div>

      {/* 옵션들 */}
      <div className="options-container">
        {currentOptions.map((option, index) => {
          let buttonClass = 'option-button';
          
          if (gameState.isAnswered) {
            if (index === correctAnswerIndex) {
              buttonClass += ' correct';
            } else if (index === gameState.selectedAnswer && index !== correctAnswerIndex) {
              buttonClass += ' incorrect';
            } else {
              buttonClass += ' disabled';
            }
          }

          return (
            <button
              key={index}
              className={buttonClass}
              onClick={() => handleAnswerSelect(index)}
              disabled={gameState.isAnswered}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* 피드백 */}
      {gameState.isAnswered && (
        <div className="feedback">
          {gameState.selectedAnswer === correctAnswerIndex ? (
            <div className="feedback-correct">
              <span style={{ fontSize: '20x' }}>✅</span>
              <span style={{ fontSize: '18px' }}>{t('stage3.game.correct')}</span>
            </div>
          ) : (
            <div className="feedback-incorrect">
              <span style={{ fontSize: '20px' }}>❌</span>
              <span style={{ fontSize: '18px' }}>{t('stage3.game.incorrect')}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SentenceGame;