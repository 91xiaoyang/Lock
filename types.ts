export enum AppStage {
  INTRO = 'INTRO',
  LESSON = 'LESSON',
  GAME = 'GAME',
  SUMMARY = 'SUMMARY'
}

export enum GameLevel {
  MAKE_LOCK = 'MAKE_LOCK', // Easy: p * q = n
  BREAK_LOCK = 'BREAK_LOCK' // Hard: n = ? * ?
}

export interface TeacherMessage {
  role: 'user' | 'model';
  text: string;
}

export interface MathProblem {
  p: number;
  q: number;
  n: number;
  description: string;
}