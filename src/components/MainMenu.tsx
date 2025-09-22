import React, { useState } from 'react';
import '../styles/MainMenu.css';
import { useTranslation } from 'react-i18next';

 

interface MainMenuProps {
  onStageSelect: (stage: number) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStageSelect }) => {
  const { t } = useTranslation()

   const stages = [
    {
      id: 1,
      title: t('mainMenu.stages.stage1.title'),
      description: t('mainMenu.stages.stage1.description'),
      difficulty: t('mainMenu.stages.stage1.difficulty'),
      items: t('mainMenu.stages.stage1.items'),
      icon: '🔤',
      color: '#4CAF50',
      completed: localStorage.getItem('hangulGameBestScore') !== null,
    },
    {
      id: 2,
      title: t('mainMenu.stages.stage2.title'),
      description: t('mainMenu.stages.stage2.description'),
      difficulty: t('mainMenu.stages.stage2.difficulty'),
      items: t('mainMenu.stages.stage2.items'),
      icon: '📝',
      color: '#FF6B6B',
      completed: localStorage.getItem('wordGameBestStreak') !== null,
    },
    {
      id: 3,
      title: t('mainMenu.stages.stage3.title'),
      description: t('mainMenu.stages.stage3.description'),
      difficulty: t('mainMenu.stages.stage3.difficulty'),
      items: t('mainMenu.stages.stage3.items'),
      icon: '💬',
      color: '#9C27B0',
      disabled: false,
    },
  ];

  const [selectedStage, setSelectedStage] = useState<number | null>(null);

  const handleStageClick = (stageId: number) => {
    if (stages.find(s => s.id === stageId)?.disabled) return;
    
    if (selectedStage === stageId) {
      onStageSelect(stageId);
    } else {
      setSelectedStage(stageId);
    }
  };

  return (
    <div className='main-menu'>
      <div className='welcome-section'>
        <div className='welcome-content'>
          <h1 className='welcome-title'>
            {t('mainMenu.welcome.title')} 🎉
          </h1>
          <p className='welcome-subtitle'>
           {t('mainMenu.welcome.subtitle')} 
          </p>
        </div>
      </div>

      <div className='stages-container'>
        <h2 className='stages-heading'>{t('mainMenu.selectStage')}</h2>
        
        <div className='stages-grid'>
          {stages.map((stage) => (
            <div
              key={stage.id}
              className={`stage-card ${stage.disabled ? 'disabled' : ''} ${
                selectedStage === stage.id ? 'selected' : ''
              }`}
              onClick={() => handleStageClick(stage.id)}
            >
              {stage.completed && (
                <div className='completion-badge'>
                  ✅ Completed
                </div>
              )}
              
              <div className='stage-icon' style={{ background: stage.color }}>
                {stage.icon}
              </div>
              
              <div className='stage-info'>
                <h3 className='stage-title'>{stage.title}</h3>
                <p className='stage-description'>{stage.description}</p>
                
                <div className='stage-meta'>
                  <span 
                    className='difficulty-badge'
                    style={{ background: `${stage.color}15`, color: stage.color }}
                  >
                    {stage.difficulty}
                  </span>
                  <span className='items-count'>{stage.items}</span>
                </div>
              </div>

              {stage.disabled && (
                <div className='coming-soon-overlay'>
                  <span>🚧 {t('mainMenu.comingSoon')}</span>
                </div>
              )}

              {selectedStage === stage.id && !stage.disabled && (
                <div className='start-prompt'>
                  <span>{t('mainMenu.clickToStart')}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedStage && !stages.find(s => s.id === selectedStage)?.disabled && (
          <div className='start-section'>
            <button
              className='start-button'
              style={{ 
                background: stages.find(s => s.id === selectedStage)?.color,
                boxShadow: `0 4px 20px ${stages.find(s => s.id === selectedStage)?.color}40`
              }}
              onClick={() => onStageSelect(selectedStage)}
            >
              🚀 Start {stages.find(s => s.id === selectedStage)?.title}
            </button>
          </div>
        )}
      </div>

      <div className='progress-section'>
        <h3>Your Learning Progress</h3>
        <div className='progress-grid'>
          <div className='progress-item'>
            <div className='progress-number'>
              {localStorage.getItem('hangulGameBestScore') || '0'}
            </div>
            <div className='progress-label'>Stage 1 Best Score</div>
          </div>
          <div className='progress-item'>
            <div className='progress-number'>
              {localStorage.getItem('wordGameBestStreak') || '0'}
            </div>
            <div className='progress-label'>Stage 2 Best Streak</div>
          </div>
          <div className='progress-item'>
            <div className='progress-number'>
              {localStorage.getItem('visitCount') || '0'}
            </div>
            <div className='progress-label'>Study Sessions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
