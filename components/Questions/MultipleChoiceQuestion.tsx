import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Question } from '../Questions/types';
import { utl } from '../../styles/utl';

type Props = {
  question: Question;
  onAnswer: (answer: string) => void;
  answer?: string; // ✅ Must exist
};


export const MultipleChoiceQuestion: React.FC<Props> = ({ question, onAnswer, answer }) => {
  const options = question?.options;

  if (!Array.isArray(options) || options.length === 0) {
    return (
      <Text style={[utl.textError, utl.textCenter]}>
        ⚠ This question is missing options.
      </Text>
    );
  }

  return (
    <View>
      <Text style={[utl.textLight, utl.textLg, utl.fontJostMedium, utl.mb12]}>
        {question.question}
      </Text>
      {options.map((option, index) => (
        <Pressable
          key={index}
          onPress={() => onAnswer(option)}
          style={[
            utl.p12,
            utl.roundedMd,
            utl.mb8,
            answer === option ? utl.bgPrimary : utl.bgSurface
          ]}
        >
          <Text style={[utl.textDark, utl.fontInter]}>
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};
