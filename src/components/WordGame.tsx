import React from 'react';
//import { useTranslation } from 'react-i18next';
import { useWordGame } from '../hooks/useWordGame';
import type { WordCategory } from '../constants/types/word';
import '../styles/WordGame.css';

const WordGame: React.FC = () => {
 // const { t } = useTranslation();
  const {
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
  } = useWordGame(15);

  // 게임 시작 전 화면
  if (!gameState.isGameActive && gameState.currentQuestionIndex === 0) {
    return (
      <div className='word-game'>
        <div className='game-start'>
          <h1>🎯 Learn Korean Words - Stage 2</h1>
          <p>Learn numbers, animals, colors, family, and body parts!</p>
          
          <div className='category-selection'>
            <h3>Choose a category:</h3>
            <div className='category-grid'>
              {Object.entries(availableCategories).map(([key, label]) => {
                const wordCount = getWordsByCategory(key as WordCategory).length;
                return (
                  <button
                    key={key}
                    className={`category-btn ${gameState.selectedCategory === key ? 'selected' : ''}`}
                    onClick={() => changeCategory(key as WordCategory)}
                  >
                    <div className='category-icon'>
                      {key === 'all' && '🌟'}
                      {key === 'numbers' && '🔢'}
                      {key === 'animals' && '🐾'}
                      {key === 'colors' && '🎨'}
                      {key === 'family' && '👨‍👩‍👧‍👦'}
                      {key === 'body' && '🫵'}
                    </div>
                    <div className='category-label'>{label}</div>
                    <div className='category-count'>{wordCount} words</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className='info-box'>
            <h3>Game Rules:</h3>
            <ul>
              <li>15 questions will appear</li>
              <li>Match Korean words with English meanings</li>
              <li>Earn bonus points for consecutive correct answers! 🔥</li>
              <li>Your best streak: <strong>{gameState.bestStreak} 🏆</strong></li>
            </ul>
          </div>
          
          <button 
            className='start-button' 
            onClick={() => startGame(gameState.selectedCategory as WordCategory)}
          >
            🚀 Start Learning!
          </button>
        </div>
      </div>
    );
  }

  // 게임 완료 화면
  if (!gameState.isGameActive && gameState.currentQuestionIndex > 0) {
    const percentage = Math.round((gameState.correctAnswers / gameState.totalQuestions) * 100);
    const isNewRecord = gameState.bestStreak > parseInt(localStorage.getItem('wordGameBestStreak') || '0');
    
    return (
      <div className='word-game'>
        <div className='game-result'>
          <h2>🎉 Great Job!</h2>
          
          <div className='score-display'>
            <div className='score-big'>{gameState.score} points</div>
            <div className='accuracy'>
              {gameState.correctAnswers}/{gameState.totalQuestions} correct ({percentage}%)
            </div>
            <div className='streak-display'>
              <div className='current-streak'>
                Best Streak: <span className='streak-number'>{gameState.bestStreak} 🔥</span>
                {isNewRecord && <span className='new-record'>NEW RECORD! 🏆</span>}
              </div>
            </div>
          </div>

          <div className='result-message'>
            {percentage >= 90 ? (
              <div className='excellent'>
                <span>🏆</span>
                <p>Outstanding! You're mastering Korean vocabulary!</p>
              </div>
            ) : percentage >= 80 ? (
              <div className='excellent'>
                <span>⭐</span>
                <p>Excellent work! Keep up the great progress!</p>
              </div>
            ) : percentage >= 70 ? (
              <div className='good'>
                <span>👏</span>
                <p>Good job! You're getting better at Korean words!</p>
              </div>
            ) : percentage >= 60 ? (
              <div className='good'>
                <span>💪</span>
                <p>Not bad! Practice more and you'll improve quickly!</p>
              </div>
            ) : (
              <div className='try-again'>
                <span>📚</span>
                <p>Keep studying! Every attempt makes you better!</p>
              </div>
            )}
          </div>

          <div className='result-actions'>
            <button className='restart-button' onClick={restartGame}>
              🔄 Try Again
            </button>
            <button 
              className='category-button' 
              onClick={() => setGameState(prev => ({ ...prev, currentQuestionIndex: 0 }))}
            >
              📂 Change Category
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 게임 진행 중 화면
  return (
    <div className='word-game'>
      {/* 상단 정보 */}
      <div className='game-header'>
        <div className='progress-bar'>
          <div
            className='progress-fill'
            style={{
              width: `${(gameState.currentQuestionIndex / gameState.totalQuestions) * 100}%`,
            }}
          ></div>
        </div>
        
        <div className='game-info'>
          <span>Question {gameState.currentQuestionIndex + 1}/{gameState.totalQuestions}</span>
          <span>Score: {gameState.score}</span>
          {gameState.currentStreak > 0 && (
            <span className='streak-indicator'>
              🔥 {gameState.currentStreak}
            </span>
          )}
        </div>
        
        <div className='category-indicator'>
          {availableCategories[gameState.selectedCategory]} 
        </div>
      </div>

      {/* 질문 */}
      {currentQuestion && (
        <div className='question-section'>
          <div className='question-type'>
            {currentQuestion.type === 'korean-to-english' && 'Korean → English'}
            {currentQuestion.type === 'english-to-korean' && 'English → Korean'}
            {currentQuestion.type === 'romanization' && 'Korean → Pronunciation'}
          </div>
          
          <div className='word-display'>
            <div className='main-word korean-text'>
              {currentQuestion.question}
            </div>
            
            {currentQuestion.type === 'korean-to-english' && (
              <div className='romanization'>
                [{currentQuestion.word.romanization}]
              </div>
            )}
            
            <div className='word-category'>
              Category: {currentQuestion.word.category}
            </div>
          </div>

          {/* 선택지 */}
          <div className='options'>
            {currentQuestion.options.map((option, index) => {
              let buttonClass = 'option-button';
              
              if (showResult) {
                if (option === currentQuestion.correctAnswer) {
                  buttonClass += ' correct';
                } else if (option === selectedAnswer && option !== currentQuestion.correctAnswer) {
                  buttonClass += ' incorrect';
                } else {
                  buttonClass += ' disabled';
                }
              }
              
              return (
                <button
                  key={index}
                  className={buttonClass}
                  onClick={() => selectAnswer(option)}
                  disabled={showResult}
                >
                  <span className='option-text korean-text'>{option}</span>
                </button>
              );
            })}
          </div>

          {/* 결과 피드백 */}
          {showResult && (
            <div className='result-feedback'>
              {selectedAnswer === currentQuestion.correctAnswer ? (
                <div className='feedback correct'>
                  <span>✅</span>
                  <p>Correct!</p>
                  {gameState.currentStreak > 1 && (
                    <p className='streak-bonus'>
                      🔥 {gameState.currentStreak} in a row! +{Math.min(gameState.currentStreak * 2, 20)} bonus points!
                    </p>
                  )}
                </div>
              ) : (
                <div className='feedback incorrect'>
                  <span>❌</span>
                  <p>The answer is: <strong>{currentQuestion.correctAnswer}</strong></p>
                  <div className='word-details'>
                    <p><strong>Korean:</strong> {currentQuestion.word.korean}</p>
                    <p><strong>English:</strong> {currentQuestion.word.english}</p>
                    <p><strong>Pronunciation:</strong> [{currentQuestion.word.romanization}]</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WordGame;
