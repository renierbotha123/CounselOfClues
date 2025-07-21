import React from 'react';
import { StyleProp, ViewStyle, TextStyle, TextInput, Text, View } from 'react-native';
import { utl } from '../styles/utl';

type InputFieldProps = {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secure?: boolean;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  multiline?: boolean;
};

export default function InputField({
  label,
  required,
  placeholder,
  secure,
  value,
  onChangeText,
  style,
  inputStyle
}: InputFieldProps) {
  return (
    <View style={[style]}>
      {label && (
        <Text style={[utl.textLight, utl.mb4, utl.fontJostMedium, utl.textSm]}>
          {required ? '*' : ''}{label}
        </Text>
      )}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#8F8F8F"
        secureTextEntry={secure}
        value={value}
        onChangeText={onChangeText}
        style={[
          utl.bgSurface,
          utl.textDark,
          utl.p12,
          utl.roundedLg,
          utl.border1,
          utl.fontJost,
          utl.textBase,
          inputStyle,
        ]}
        
      />
    </View>
  );
}