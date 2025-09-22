export interface SentenceItem {
  korean: string;
  english: string;
  romanization: string;
  category: 'greetings' | 'polite' | 'basic_conversation' | 'daily_expressions';
}

// 인사말
export const greetingsData: SentenceItem[] = [
  {
    korean: '안녕하세요',
    english: 'Hello',
    romanization: 'annyeonghaseyo',
    category: 'greetings'
  },
  {
    korean: '안녕히 가세요',
    english: 'Goodbye (to someone leaving)',
    romanization: 'annyeonghi gaseyo',
    category: 'greetings'
  },
  {
    korean: '안녕히 계세요',
    english: 'Goodbye (when you are leaving)',
    romanization: 'annyeonghi gyeseyo',
    category: 'greetings'
  },
  {
    korean: '좋은 아침이에요',
    english: 'Good morning',
    romanization: 'joeun achimieyo',
    category: 'greetings'
  },
  {
    korean: '잘 자요',
    english: 'Good night',
    romanization: 'jal jayo',
    category: 'greetings'
  }
];

// 정중한 표현
export const politeData: SentenceItem[] = [
  {
    korean: '감사합니다',
    english: 'Thank you',
    romanization: 'gamsahamnida',
    category: 'polite'
  },
  {
    korean: '죄송합니다',
    english: 'I\'m sorry',
    romanization: 'joesonghamnida',
    category: 'polite'
  },
  {
    korean: '괜찮아요',
    english: 'It\'s okay',
    romanization: 'gwaenchanhayo',
    category: 'polite'
  },
  {
    korean: '실례합니다',
    english: 'Excuse me',
    romanization: 'sillyehamnida',
    category: 'polite'
  },
  {
    korean: '천만에요',
    english: 'You\'re welcome',
    romanization: 'cheonmaneyo',
    category: 'polite'
  }
];

// 기본 대화
export const basicConversationData: SentenceItem[] = [
  {
    korean: '이름이 뭐예요?',
    english: 'What is your name?',
    romanization: 'ireumi mwoyeyo?',
    category: 'basic_conversation'
  },
  {
    korean: '저는 학생입니다',
    english: 'I am a student',
    romanization: 'jeoneun haksaengiminda',
    category: 'basic_conversation'
  },
  {
    korean: '한국어를 공부해요',
    english: 'I study Korean',
    romanization: 'hangugeoreul gongbuhaeyo',
    category: 'basic_conversation'
  },
  {
    korean: '어디에서 왔어요?',
    english: 'Where are you from?',
    romanization: 'eodieseo wasseoyo?',
    category: 'basic_conversation'
  },
  {
    korean: '몇 살이에요?',
    english: 'How old are you?',
    romanization: 'myeot sarieyo?',
    category: 'basic_conversation'
  }
];

// 일상 표현
export const dailyExpressionsData: SentenceItem[] = [
  {
    korean: '배고파요',
    english: 'I\'m hungry',
    romanization: 'baegopayo',
    category: 'daily_expressions'
  },
  {
    korean: '목말라요',
    english: 'I\'m thirsty',
    romanization: 'mongmallayo',
    category: 'daily_expressions'
  },
  {
    korean: '도와주세요',
    english: 'Please help me',
    romanization: 'dowajuseyo',
    category: 'daily_expressions'
  },
  {
    korean: '잠깐만요',
    english: 'Wait a moment',
    romanization: 'jamkkanmanyo',
    category: 'daily_expressions'
  },
  {
    korean: '잘 모르겠어요',
    english: 'I don\'t know well',
    romanization: 'jal moreugesseoyo',
    category: 'daily_expressions'
  }
];

export const allSentencesData: SentenceItem[] = [
  ...greetingsData,
  ...politeData,
  ...basicConversationData,
  ...dailyExpressionsData
];

export const sentenceCategories = {
  greetings: greetingsData,
  polite: politeData,
  basic_conversation: basicConversationData,
  daily_expressions: dailyExpressionsData
};