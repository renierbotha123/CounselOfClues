import React from 'react';
import { Pressable, Text, StyleProp, ViewStyle, TextStyle, View } from 'react-native';
import { utl } from '../styles/utl';

type PrimaryButtonProps = {
  title?: string;
  onPress: () => void;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};


export default function PrimaryButton({
  title,
  onPress,
  icon,
  style,
  textStyle
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        utl.bgPrimary,
        utl.py12,
        utl.px16,
        utl.roundedLg,
        utl.itemsCenter,
        utl.flexRow,
        utl.justifyCenter,
        utl.wFull,
        style
      ]}
    >
      {icon && (
        <View style={[utl.mr8]}>
          {icon}
        </View>
      )}
      {title && (
        <Text
          style={[
            utl.textDark,
            utl.fontJostMedium,
            utl.textBase,
            utl.textCenter,
            textStyle
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
