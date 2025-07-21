import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { utl } from '../styles/utl';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function PrimaryButton({ title, onPress, disabled = false }: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        utl.bgPrimary,
        utl.p12,
        utl.roundedMd,
        disabled && styles.disabled,
        utl.mb16
      ]}
    >
      <Text style={[utl.textDark, utl.textCenter, utl.fontJostBold]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});
