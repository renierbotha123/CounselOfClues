import React from 'react';
import { Question } from '../Questions/types';
import { TextQuestion } from './TextQuestion';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { ABCDQuestion } from './ABCDQuestion';

type Props = {
  question: Question;
  onAnswer: (answer: string) => void;
  answer?: string;
};

export const QuestionRenderer: React.FC<Props> = ({ question, onAnswer, answer }) => {
  if (!question) return null;

  switch (question.type) {
    case 'multiple_choice':
      return <MultipleChoiceQuestion question={question} onAnswer={onAnswer} answer={answer} />;
    case 'abcd':
      return <ABCDQuestion question={question} onAnswer={onAnswer} answer={answer} />;
    case 'text':
    default:
      return <TextQuestion question={question} onAnswer={onAnswer} answer={answer} />;
  }
};