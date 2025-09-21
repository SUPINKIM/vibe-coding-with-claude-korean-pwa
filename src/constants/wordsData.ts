import type { WordItem } from './types/word';

// 숫자 (1-10)
export const numbers: WordItem[] = [
  { korean: '하나', english: 'one', romanization: 'hana', category: 'numbers', difficulty: 1 },
  { korean: '둘', english: 'two', romanization: 'dul', category: 'numbers', difficulty: 1 },
  { korean: '셋', english: 'three', romanization: 'set', category: 'numbers', difficulty: 1 },
  { korean: '넷', english: 'four', romanization: 'net', category: 'numbers', difficulty: 1 },
  { korean: '다섯', english: 'five', romanization: 'daseot', category: 'numbers', difficulty: 1 },
  { korean: '여섯', english: 'six', romanization: 'yeoseot', category: 'numbers', difficulty: 2 },
  { korean: '일곱', english: 'seven', romanization: 'ilgop', category: 'numbers', difficulty: 2 },
  { korean: '여덟', english: 'eight', romanization: 'yeodeol', category: 'numbers', difficulty: 2 },
  { korean: '아홉', english: 'nine', romanization: 'ahop', category: 'numbers', difficulty: 2 },
  { korean: '열', english: 'ten', romanization: 'yeol', category: 'numbers', difficulty: 2 }
];

// 동물
export const animals: WordItem[] = [
  { korean: '개', english: 'dog', romanization: 'gae', category: 'animals', difficulty: 1 },
  { korean: '고양이', english: 'cat', romanization: 'goyangi', category: 'animals', difficulty: 1 },
  { korean: '새', english: 'bird', romanization: 'sae', category: 'animals', difficulty: 1 },
  { korean: '물고기', english: 'fish', romanization: 'mulgogi', category: 'animals', difficulty: 2 },
  { korean: '토끼', english: 'rabbit', romanization: 'tokki', category: 'animals', difficulty: 1 },
  { korean: '사자', english: 'lion', romanization: 'saja', category: 'animals', difficulty: 2 },
  { korean: '호랑이', english: 'tiger', romanization: 'horangi', category: 'animals', difficulty: 3 },
  { korean: '코끼리', english: 'elephant', romanization: 'kokkiri', category: 'animals', difficulty: 3 },
  { korean: '원숭이', english: 'monkey', romanization: 'wonsungi', category: 'animals', difficulty: 3 },
  { korean: '곰', english: 'bear', romanization: 'gom', category: 'animals', difficulty: 1 },
  { korean: '돼지', english: 'pig', romanization: 'dwaeji', category: 'animals', difficulty: 1 },
  { korean: '소', english: 'cow', romanization: 'so', category: 'animals', difficulty: 1 }
];

// 색깔
export const colors: WordItem[] = [
  { korean: '빨간색', english: 'red', romanization: 'ppalgansaek', category: 'colors', difficulty: 2 },
  { korean: '파란색', english: 'blue', romanization: 'paransaek', category: 'colors', difficulty: 2 },
  { korean: '노란색', english: 'yellow', romanization: 'noransaek', category: 'colors', difficulty: 2 },
  { korean: '초록색', english: 'green', romanization: 'choroksaek', category: 'colors', difficulty: 3 },
  { korean: '검은색', english: 'black', romanization: 'geomeunsaek', category: 'colors', difficulty: 3 },
  { korean: '흰색', english: 'white', romanization: 'huinsaek', category: 'colors', difficulty: 2 },
  { korean: '분홍색', english: 'pink', romanization: 'bunhongsaek', category: 'colors', difficulty: 3 },
  { korean: '보라색', english: 'purple', romanization: 'borasaek', category: 'colors', difficulty: 3 }
];

// 가족
export const family: WordItem[] = [
  { korean: '아빠', english: 'dad', romanization: 'appa', category: 'family', difficulty: 1 },
  { korean: '엄마', english: 'mom', romanization: 'eomma', category: 'family', difficulty: 1 },
  { korean: '할아버지', english: 'grandfather', romanization: 'harabeoji', category: 'family', difficulty: 3 },
  { korean: '할머니', english: 'grandmother', romanization: 'halmeoni', category: 'family', difficulty: 3 },
  { korean: '형', english: 'older brother (for males)', romanization: 'hyeong', category: 'family', difficulty: 2 },
  { korean: '누나', english: 'older sister (for males)', romanization: 'nuna', category: 'family', difficulty: 2 },
  { korean: '언니', english: 'older sister (for females)', romanization: 'eonni', category: 'family', difficulty: 2 },
  { korean: '오빠', english: 'older brother (for females)', romanization: 'oppa', category: 'family', difficulty: 2 },
  { korean: '동생', english: 'younger sibling', romanization: 'dongsaeng', category: 'family', difficulty: 2 }
];

// 몸
export const body: WordItem[] = [
  { korean: '머리', english: 'head', romanization: 'meori', category: 'body', difficulty: 1 },
  { korean: '눈', english: 'eye', romanization: 'nun', category: 'body', difficulty: 1 },
  { korean: '코', english: 'nose', romanization: 'ko', category: 'body', difficulty: 1 },
  { korean: '입', english: 'mouth', romanization: 'ip', category: 'body', difficulty: 1 },
  { korean: '귀', english: 'ear', romanization: 'gwi', category: 'body', difficulty: 1 },
  { korean: '손', english: 'hand', romanization: 'son', category: 'body', difficulty: 1 },
  { korean: '발', english: 'foot', romanization: 'bal', category: 'body', difficulty: 1 },
  { korean: '다리', english: 'leg', romanization: 'dari', category: 'body', difficulty: 1 },
  { korean: '팔', english: 'arm', romanization: 'pal', category: 'body', difficulty: 1 }
];

export const wordsData = {
  numbers,
  animals,
  colors,
  family,
  body,
  all: [...numbers, ...animals, ...colors, ...family, ...body]
};
