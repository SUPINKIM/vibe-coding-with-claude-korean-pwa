import type { HangulItem } from './types/hangul';

// 기본 자음 (14개)
export const basicConsonants: HangulItem[] = [
  { character: 'ㄱ', romanization: 'g/k', name: '기역', type: 'consonant', example: '가방 (bag)' },
  { character: 'ㄴ', romanization: 'n', name: '니은', type: 'consonant', example: '나무 (tree)' },
  { character: 'ㄷ', romanization: 'd/t', name: '디귿', type: 'consonant', example: '다리 (leg)' },
  { character: 'ㄹ', romanization: 'r/l', name: '리을', type: 'consonant', example: '라면 (ramen)' },
  { character: 'ㅁ', romanization: 'm', name: '미음', type: 'consonant', example: '마음 (heart)' },
  { character: 'ㅂ', romanization: 'b/p', name: '비읍', type: 'consonant', example: '바나나 (banana)' },
  { character: 'ㅅ', romanization: 's', name: '시옷', type: 'consonant', example: '사과 (apple)' },
  { character: 'ㅇ', romanization: '-/ng', name: '이응', type: 'consonant', example: '아이 (child)' },
  { character: 'ㅈ', romanization: 'j', name: '지읒', type: 'consonant', example: '자동차 (car)' },
  { character: 'ㅊ', romanization: 'ch', name: '치읓', type: 'consonant', example: '차 (tea)' },
  { character: 'ㅋ', romanization: 'k', name: '키읔', type: 'consonant', example: '코 (nose)' },
  { character: 'ㅌ', romanization: 't', name: '티읕', type: 'consonant', example: '토마토 (tomato)' },
  { character: 'ㅍ', romanization: 'p', name: '피읖', type: 'consonant', example: '파 (green onion)' },
  { character: 'ㅎ', romanization: 'h', name: '히읗', type: 'consonant', example: '하늘 (sky)' }
];

// 기본 모음 (10개)
export const basicVowels: HangulItem[] = [
  { character: 'ㅏ', romanization: 'a', name: '아', type: 'vowel', example: '아빠 (dad)' },
  { character: 'ㅑ', romanization: 'ya', name: '야', type: 'vowel', example: '야구 (baseball)' },
  { character: 'ㅓ', romanization: 'eo', name: '어', type: 'vowel', example: '어머니 (mother)' },
  { character: 'ㅕ', romanization: 'yeo', name: '여', type: 'vowel', example: '여름 (summer)' },
  { character: 'ㅗ', romanization: 'o', name: '오', type: 'vowel', example: '오빠 (older brother)' },
  { character: 'ㅛ', romanization: 'yo', name: '요', type: 'vowel', example: '요리 (cooking)' },
  { character: 'ㅜ', romanization: 'u', name: '우', type: 'vowel', example: '우유 (milk)' },
  { character: 'ㅠ', romanization: 'yu', name: '유', type: 'vowel', example: '유리 (glass)' },
  { character: 'ㅡ', romanization: 'eu', name: '으', type: 'vowel', example: '으음 (hmm)' },
  { character: 'ㅣ', romanization: 'i', name: '이', type: 'vowel', example: '이름 (name)' }
];

// 모든 한글 데이터
export const allHangul = [...basicConsonants, ...basicVowels];

// 연습용 간단한 글자들
export const practiceCharacters = [
  '가', '나', '다', '라', '마', '바', '사', '아', '자', '차',
  '거', '너', '더', '러', '머', '버', '서', '어', '저', '처',
  '고', '노', '도', '로', '모', '보', '소', '오', '조', '초'
];
