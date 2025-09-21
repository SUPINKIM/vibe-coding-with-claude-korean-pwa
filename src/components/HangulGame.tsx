import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHangulGame } from '../hooks/useHangulGame';
import '../styles/HangulGame.css';

const HangulGame: React.FC = () => {
  const { t } = useTranslation();
  const {
    gameState,
    currentQuestion,
    selectedAnswer,
    showResult,
    startGame,
    selectAnswer,
    restartGame,
  } = useHangulGame(10);

  // 게임 시작 전 화면
  if (!gameState.isGameActive && gameState.currentQuestionIndex === 0) {
    return (
      <div className='hangul-game'>
        <div className='game-start'>
          <h1>{t('stage1.title')}</h1>
          <p>{t('stage1.description')}</p>
          <div className='info-box'>
            <h3>{t('stage1.rules.title')}</h3>
            <ul>
              <li>{t('stage1.rules.rule1')}</li>
              <li>{t('stage1.rules.rule2')}</li>
              <li>{t('stage1.rules.rule3')}</li>
            </ul>
          </div>
          <button className='start-button' onClick={startGame}>
            🚀 {t('start')}
          </button>
        </div>
      </div>
    );
  }

  // 게임 완료 화면
  if (!gameState.isGameActive && gameState.currentQuestionIndex > 0) {
    const percentage = Math.round(
      (gameState.correctAnswers / gameState.totalQuestions) * 100
    );

    let resultType: 'excellent' | 'good' | 'tryAgain';
    if (percentage >= 80) {
      resultType = 'excellent';
    } else if (percentage >= 60) {
      resultType = 'good';
    } else {
      resultType = 'tryAgain';
    }

    return (
      <div className='hangul-game'>
        <div className='game-result'>
          <h2>{t('results.title')}</h2>
          <div className='score-display'>
            <div className='score-big'>
              {t('results.finalScore', { score: gameState.score })}
            </div>
            <div className='accuracy'>
              {t('results.accuracy', {
                correct: gameState.correctAnswers,
                total: gameState.totalQuestions,
                percentage,
              })}
            </div>
          </div>

          <div className='result-message'>
            <div className={resultType}>
              <span>{t(`results.${resultType}.icon`)}</span>
              <p>{t(`results.${resultType}.message`)}</p>
            </div>
          </div>

          <button className='restart-button' onClick={restartGame}>
            🔄 {t('restart')}
          </button>
        </div>
      </div>
    );
  }

  // 게임 진행 중 화면
  return (
    <div className='hangul-game'>
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
          <span>
            {t('progress')} {gameState.currentQuestionIndex + 1}/
            {gameState.totalQuestions}
          </span>
          <span>
            {t('score')}: {gameState.score}
          </span>
        </div>
      </div>

      {/* 질문 */}
      {currentQuestion && (
        <div className='question-section'>
          <div className='hangul-display'>
            {currentQuestion.hangul.character}
          </div>
          <div className='question-text'>
            {t(`stage1.questions.${currentQuestion.type}`, {
              character: currentQuestion.hangul.character,
            })}
          </div>

          {/* 선택지 */}
          <div className='options'>
            {currentQuestion.options.map((option, index) => {
              let buttonClass = 'option-button';

              if (showResult) {
                if (option === currentQuestion.correctAnswer) {
                  buttonClass += ' correct';
                } else if (
                  option === selectedAnswer &&
                  option !== currentQuestion.correctAnswer
                ) {
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
                  {option}
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
                  <p>{t('stage1.feedback.correct')}</p>
                  <p className='example'>
                    {t('stage1.feedback.example', {
                      example: currentQuestion.hangul.example,
                    })}
                  </p>
                </div>
              ) : (
                <div className='feedback incorrect'>
                  <span>❌</span>
                  <p>
                    {t('stage1.feedback.incorrect', {
                      answer: currentQuestion.correctAnswer,
                    })}
                  </p>
                  <p className='example'>
                    {t('stage1.feedback.example', {
                      example: currentQuestion.hangul.example,
                    })}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HangulGame;