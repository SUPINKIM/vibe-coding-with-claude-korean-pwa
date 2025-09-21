import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 영어 번역
const en = {
  translation: {
    // 헤더
    header: {
      title: 'Korean Learning',
      subtitle: 'Learn Korean in a fun way!'
    },
    
    // 메인 메뉴
    mainMenu: {
      welcome: {
        title: 'Welcome to Korean Learning! 🎉',
        subtitle: 'Choose your learning stage and start your Korean journey'
      },
      selectStage: 'Select Learning Stage',
      stages: {
        stage1: {
          title: 'Stage 1: Hangul Basics',
          description: 'Learn Korean consonants and vowels (ㄱ, ㄴ, ㄷ...)',
          difficulty: 'Beginner',
          items: '24 characters'
        },
        stage2: {
          title: 'Stage 2: Basic Words',
          description: 'Numbers, animals, colors, family & body parts',
          difficulty: 'Beginner+',
          items: '48 words'
        },
        stage3: {
          title: 'Stage 3: Sentences',
          description: 'Greetings and basic conversations',
          difficulty: 'Intermediate',
          items: '20+ phrases'
        }
      },
      completed: 'Completed',
      comingSoon: 'Coming Soon',
      clickToStart: 'Click again to start!',
      startButton: 'Start {{stage}}',
      progress: {
        title: 'Your Learning Progress',
        stage1Score: 'Stage 1 Best Score',
        stage2Streak: 'Stage 2 Best Streak',
        studySessions: 'Study Sessions'
      }
    },
    
    // 게임 공통
    common: {
      start: 'Start Game',
      restart: 'Try Again',
      next: 'Next',
      back: 'Back to Menu',
      score: 'Score',
      level: 'Level',
      streak: 'Streak',
      progress: 'Progress',
      correct: 'Correct!',
      incorrect: 'Incorrect',
      tryAgain: 'Try Again',
      skip: 'Skip',
      hint: 'Hint',
      close: 'Close',
      continue: 'Continue'
    },
    
    // 1단계: 한글 게임
    stage1: {
      title: 'Learn Hangul - Stage 1',
      subtitle: 'Master Korean Characters',
      description: 'Learn Korean consonants and vowels!',
      rules: {
        title: 'Game Rules:',
        rule1: 'Total of 10 questions will appear',
        rule2: 'Match Hangul names and sounds',
        rule3: 'Earn 10 points for each correct answer'
      },
      questions: {
        name: 'What is the name of this character?',
        sound: 'What is the sound of this character?',
        character: '{{character}}'
      },
      feedback: {
        correct: 'Correct! Well done!',
        incorrect: 'Not quite! The answer is "{{answer}}"',
        example: 'Example: {{example}}',
        pronunciation: 'Pronunciation: {{pronunciation}}'
      },
      categories: {
        consonants: 'Consonants',
        vowels: 'Vowels',
        basic: 'Basic',
        double: 'Double',
        combined: 'Combined'
      }
    },
    
    // 2단계: 단어 게임
    stage2: {
      title: 'Basic Words - Stage 2',
      subtitle: 'Build Your Vocabulary',
      description: 'Learn essential Korean words!',
      categories: {
        all: 'All Categories',
        numbers: 'Numbers',
        animals: 'Animals',
        colors: 'Colors',
        family: 'Family',
        body: 'Body Parts',
        food: 'Food',
        time: 'Time',
        places: 'Places'
      },
      game: {
        selectCategory: 'Select a category to start',
        question: 'What does "{{word}}" mean?',
        pronunciation: '[{{pronunciation}}]',
        streak: 'Current Streak: {{count}}',
        bestStreak: 'Best Streak: {{count}}',
        lives: 'Lives: {{count}}',
        gameOver: 'Game Over!',
        finalStreak: 'Final Streak: {{count}}',
        newRecord: 'New Record! 🎉'
      },
      feedback: {
        correct: 'Correct! +1 Streak',
        incorrect: 'Wrong! The answer is "{{answer}}"',
        keepGoing: 'Keep it up!',
        amazing: 'Amazing streak!',
        perfect: 'Perfect!'
      }
    },
    
    // 3단계: 문장 (예정)
    stage3: {
      title: 'Sentences - Stage 3',
      subtitle: 'Form Complete Sentences',
      description: 'Practice basic conversations!',
      comingSoon: 'This stage is coming soon!',
      underDevelopment: 'We are working hard to bring you this content.'
    },
    
    // 결과 화면
    results: {
      title: 'Game Complete! 🎉',
      finalScore: 'Final Score: {{score}}',
      accuracy: '{{correct}}/{{total}} correct ({{percentage}}%)',
      timeSpent: 'Time: {{time}}',
      excellent: {
        title: 'Excellent!',
        message: 'Outstanding performance! You\'ve mastered this level!'
      },
      good: {
        title: 'Well Done!',
        message: 'Great job! Keep practicing to improve even more!'
      },
      needsPractice: {
        title: 'Keep Trying!',
        message: 'Practice makes perfect! Try again to improve your score!'
      },
      buttons: {
        playAgain: 'Play Again',
        nextStage: 'Next Stage',
        backToMenu: 'Back to Menu',
        reviewMistakes: 'Review Mistakes'
      }
    },
    
    // 통계 및 성과
    stats: {
      title: 'Your Statistics',
      totalGames: 'Total Games Played',
      totalScore: 'Total Score',
      averageScore: 'Average Score',
      bestScore: 'Best Score',
      perfectGames: 'Perfect Games',
      achievements: 'Achievements',
      unlockedAchievements: '{{count}} of {{total}} Unlocked'
    },
    
    // 성과/업적
    achievements: {
      title: 'Achievements',
      firstStep: {
        name: 'First Step',
        description: 'Complete your first game'
      },
      hangulMaster: {
        name: 'Hangul Master',
        description: 'Score 100% in Hangul game'
      },
      wordWarrior: {
        name: 'Word Warrior',
        description: 'Reach a 20 word streak'
      },
      dedicated: {
        name: 'Dedicated Learner',
        description: 'Study for 7 consecutive days'
      },
      polyglot: {
        name: 'Polyglot',
        description: 'Complete all stages'
      }
    },
    
    // 설정
    settings: {
      title: 'Settings',
      language: 'Language',
      sound: 'Sound Effects',
      music: 'Background Music',
      notifications: 'Notifications',
      darkMode: 'Dark Mode',
      fontSize: 'Font Size',
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
      reset: 'Reset Progress',
      resetConfirm: 'Are you sure you want to reset all progress?',
      about: 'About',
      version: 'Version {{version}}'
    },
    
    // 도움말/튜토리얼
    tutorial: {
      skip: 'Skip Tutorial',
      next: 'Next',
      previous: 'Previous',
      finish: 'Start Learning!',
      step1: {
        title: 'Welcome to Korean Learning!',
        description: 'This app will help you learn Korean step by step.'
      },
      step2: {
        title: 'Choose Your Stage',
        description: 'Start with Hangul basics, then move to words and sentences.'
      },
      step3: {
        title: 'Track Your Progress',
        description: 'Your scores and achievements are saved automatically.'
      }
    },
    
    // 에러 메시지
    errors: {
      loadingFailed: 'Failed to load content. Please try again.',
      connectionError: 'Connection error. Please check your internet.',
      saveFailed: 'Failed to save progress.',
      unknown: 'An unexpected error occurred.'
    },
    
    // 확인 메시지
    confirmations: {
      exit: 'Are you sure you want to exit?',
      unsavedProgress: 'Your progress will be lost. Continue?',
      deleteProgress: 'This will delete all your progress. Are you sure?'
    }
  }
};

// 한국어 번역
const ko = {
  translation: {
    // 헤더
    header: {
      title: '한국어 학습',
      subtitle: '한국어를 재미있게 배우세요!'
    },
    
    // 메인 메뉴
    mainMenu: {
      welcome: {
        title: '한국어 학습에 오신 것을 환영합니다! 🎉',
        subtitle: '학습 단계를 선택하고 한국어 여행을 시작하세요'
      },
      selectStage: '학습 단계 선택',
      stages: {
        stage1: {
          title: '1단계: 한글 기초',
          description: '한글 자음과 모음 배우기 (ㄱ, ㄴ, ㄷ...)',
          difficulty: '초급',
          items: '24개 글자'
        },
        stage2: {
          title: '2단계: 기본 단어',
          description: '숫자, 동물, 색깔, 가족, 신체 부위',
          difficulty: '초급+',
          items: '48개 단어'
        },
        stage3: {
          title: '3단계: 문장',
          description: '인사말과 기본 회화',
          difficulty: '중급',
          items: '20개 이상 문구'
        }
      },
      completed: '완료',
      comingSoon: '준비 중',
      clickToStart: '한 번 더 클릭하여 시작!',
      startButton: '{{stage}} 시작',
      progress: {
        title: '학습 진행 상황',
        stage1Score: '1단계 최고 점수',
        stage2Streak: '2단계 최고 연속',
        studySessions: '학습 세션'
      }
    },
    
    // 게임 공통
    common: {
      start: '게임 시작',
      restart: '다시 도전',
      next: '다음',
      back: '메뉴로 돌아가기',
      score: '점수',
      level: '레벨',
      streak: '연속',
      progress: '진행률',
      correct: '정답!',
      incorrect: '틀렸습니다',
      tryAgain: '다시 시도',
      skip: '건너뛰기',
      hint: '힌트',
      close: '닫기',
      continue: '계속하기'
    },
    
    // 1단계: 한글 게임
    stage1: {
      title: '한글 배우기 - 1단계',
      subtitle: '한글 글자 마스터하기',
      description: '한글 자음과 모음을 배워보세요!',
      rules: {
        title: '게임 규칙:',
        rule1: '총 10개의 문제가 출제됩니다',
        rule2: '한글 이름과 소리를 맞춰보세요',
        rule3: '정답마다 10점을 획득합니다'
      },
      questions: {
        name: '이 글자의 이름은 무엇인가요?',
        sound: '이 글자의 소리는 무엇인가요?',
        character: '{{character}}'
      },
      feedback: {
        correct: '정답입니다! 잘했어요!',
        incorrect: '아쉬워요! 정답은 "{{answer}}"입니다',
        example: '예시: {{example}}',
        pronunciation: '발음: {{pronunciation}}'
      },
      categories: {
        consonants: '자음',
        vowels: '모음',
        basic: '기본',
        double: '쌍자음',
        combined: '복합'
      }
    },
    
    // 2단계: 단어 게임
    stage2: {
      title: '기본 단어 - 2단계',
      subtitle: '어휘력 기르기',
      description: '필수 한국어 단어를 배워보세요!',
      categories: {
        all: '모든 카테고리',
        numbers: '숫자',
        animals: '동물',
        colors: '색깔',
        family: '가족',
        body: '신체 부위',
        food: '음식',
        time: '시간',
        places: '장소'
      },
      game: {
        selectCategory: '카테고리를 선택하여 시작하세요',
        question: '"{{word}}"의 뜻은 무엇인가요?',
        pronunciation: '[{{pronunciation}}]',
        streak: '현재 연속: {{count}}',
        bestStreak: '최고 연속: {{count}}',
        lives: '남은 기회: {{count}}',
        gameOver: '게임 종료!',
        finalStreak: '최종 연속: {{count}}',
        newRecord: '신기록! 🎉'
      },
      feedback: {
        correct: '정답! 연속 +1',
        incorrect: '틀렸습니다! 정답은 "{{answer}}"입니다',
        keepGoing: '계속 힘내세요!',
        amazing: '놀라운 연속!',
        perfect: '완벽해요!'
      }
    },
    
    // 3단계: 문장 (예정)
    stage3: {
      title: '문장 - 3단계',
      subtitle: '완전한 문장 만들기',
      description: '기본 회화를 연습하세요!',
      comingSoon: '이 단계는 곧 출시됩니다!',
      underDevelopment: '더 나은 콘텐츠를 준비 중입니다.'
    },
    
    // 결과 화면
    results: {
      title: '게임 완료! 🎉',
      finalScore: '최종 점수: {{score}}',
      accuracy: '{{correct}}/{{total}} 정답 ({{percentage}}%)',
      timeSpent: '소요 시간: {{time}}',
      excellent: {
        title: '훌륭해요!',
        message: '뛰어난 성과입니다! 이 레벨을 완벽하게 마스터했어요!'
      },
      good: {
        title: '잘했어요!',
        message: '좋은 성과예요! 계속 연습하면 더 향상될 거예요!'
      },
      needsPractice: {
        title: '계속 노력하세요!',
        message: '연습이 완벽을 만듭니다! 다시 도전해서 점수를 올려보세요!'
      },
      buttons: {
        playAgain: '다시 플레이',
        nextStage: '다음 단계',
        backToMenu: '메뉴로 돌아가기',
        reviewMistakes: '틀린 문제 복습'
      }
    },
    
    // 통계 및 성과
    stats: {
      title: '나의 통계',
      totalGames: '총 플레이 횟수',
      totalScore: '총 점수',
      averageScore: '평균 점수',
      bestScore: '최고 점수',
      perfectGames: '완벽한 게임',
      achievements: '업적',
      unlockedAchievements: '{{total}}개 중 {{count}}개 달성'
    },
    
    // 성과/업적
    achievements: {
      title: '업적',
      firstStep: {
        name: '첫 걸음',
        description: '첫 게임을 완료하세요'
      },
      hangulMaster: {
        name: '한글 마스터',
        description: '한글 게임에서 100% 달성'
      },
      wordWarrior: {
        name: '단어 전사',
        description: '20개 단어 연속 맞추기'
      },
      dedicated: {
        name: '성실한 학습자',
        description: '7일 연속 학습하기'
      },
      polyglot: {
        name: '언어 천재',
        description: '모든 단계 완료하기'
      }
    },
    
    // 설정
    settings: {
      title: '설정',
      language: '언어',
      sound: '효과음',
      music: '배경 음악',
      notifications: '알림',
      darkMode: '다크 모드',
      fontSize: '글자 크기',
      small: '작게',
      medium: '보통',
      large: '크게',
      reset: '진행 상황 초기화',
      resetConfirm: '정말로 모든 진행 상황을 초기화하시겠습니까?',
      about: '정보',
      version: '버전 {{version}}'
    },
    
    // 도움말/튜토리얼
    tutorial: {
      skip: '튜토리얼 건너뛰기',
      next: '다음',
      previous: '이전',
      finish: '학습 시작하기!',
      step1: {
        title: '한국어 학습에 오신 것을 환영합니다!',
        description: '이 앱은 단계별로 한국어를 배우도록 도와드립니다.'
      },
      step2: {
        title: '단계 선택하기',
        description: '한글 기초부터 시작해서 단어와 문장으로 진행하세요.'
      },
      step3: {
        title: '진행 상황 추적',
        description: '점수와 업적이 자동으로 저장됩니다.'
      }
    },
    
    // 에러 메시지
    errors: {
      loadingFailed: '콘텐츠 로드에 실패했습니다. 다시 시도해주세요.',
      connectionError: '연결 오류입니다. 인터넷 연결을 확인해주세요.',
      saveFailed: '진행 상황 저장에 실패했습니다.',
      unknown: '예기치 않은 오류가 발생했습니다.'
    },
    
    // 확인 메시지
    confirmations: {
      exit: '정말로 종료하시겠습니까?',
      unsavedProgress: '진행 상황이 저장되지 않습니다. 계속하시겠습니까?',
      deleteProgress: '모든 진행 상황이 삭제됩니다. 확실하신가요?'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en,
      ko
    },
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;