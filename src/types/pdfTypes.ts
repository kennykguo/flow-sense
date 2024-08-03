export interface Word {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  text: string;
}

export interface SentenceData {
  page: number;
  sentences: Word[][];
  width: number;
  height: number;
}
