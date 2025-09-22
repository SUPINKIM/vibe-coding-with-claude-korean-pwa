import { useState } from 'react';
import Header from './components/Header';
import MainMenu from './components/MainMenu';
import HangulGame from './components/HangulGame';
import WordGame from './components/WordGame';
import PWAInstallButton from './components/PWAInstallButton';
import './App.css';
import SentenceGame from './components/SentenceGame';

function App() {
  const [currentStage, setCurrentStage] = useState<number | null>(null);

  const handleStageSelect = (stage: number) => {
    setCurrentStage(stage);
  };

  const handleBackToMenu = () => {
    setCurrentStage(null);
  };

  return (
    <div className='App'>
      <Header />
      <PWAInstallButton />
      
      <main className='main-content'>
        {currentStage === null && (
          <MainMenu onStageSelect={handleStageSelect} />
        )}
        
        {currentStage === 1 && (
          <>
            <button className='back-button' onClick={handleBackToMenu}>
              ← Back to Menu
            </button>
            <HangulGame />
          </>
        )}
        
        {currentStage === 2 && (
          <>
            <button className='back-button' onClick={handleBackToMenu}>
              ← Back to Menu
            </button>
            <WordGame />
          </>
        )}
        
        {currentStage === 3 && (
          <>
            <button className='back-button' onClick={handleBackToMenu}>
              ← Back to Menu
            </button>
            <SentenceGame />
          </>
        )}
      </main>
    </div>
  );
}

export default App;