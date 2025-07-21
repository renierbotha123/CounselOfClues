export type QuestionType = 'text' | 'multiple_choice' | 'abcd';

export interface Question {
  id: number;
  player_id: number;
  question: string;
  type: QuestionType;
  options?: string[] | null;
  round: number;
}
