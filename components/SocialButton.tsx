import React from 'react';
import { Pressable, View, Text, Image, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { utl } from '../styles/utl';

type SocialButtonProps = {
  title: string;
  icon: any;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function SocialButton({
  title,
  icon,
  onPress,
  style,
  textStyle
}: SocialButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        utl.bgWhite,
        utl.py12,
        utl.px16,
        utl.roundedXl,
        utl.flexRow,
        utl.itemsCenter,
        utl.justifyCenter,
        utl.wFull,
        style
      ]}
    >
      <Image
        source={icon}
        style={{ width: 24, height: 24, marginRight: 8 }}
        resizeMode="contain"
      />
      <Text style={[utl.textDark, utl.fontInter, textStyle]}>{title}</Text>
    </Pressable>
  );
}
