import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { Question } from './types';
import { utl } from '../../styles/utl';
import InputField from '../InputField';

type Props = {
  question: Question;
  onAnswer: (answer: string) => void;
  answer?: string;
};

export const TextQuestion: React.FC<Props> = ({ question, onAnswer, answer }) => {
  return (
    <View>
      <Text style={[utl.textLight, utl.textLg, utl.fontJostMedium, utl.mb12]}>
        {question.question}
      </Text>
      <InputField
        style={[ utl.bgSurface]}
        placeholder="Type your answer..."
        value={answer || ''}
        onChangeText={onAnswer}
        multiline
      />
    </View>
  );
};
