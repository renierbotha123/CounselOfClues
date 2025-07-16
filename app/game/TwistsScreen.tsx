import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { utl } from '../../styles/utl';

export default function TwistScreen() {
  // For now, hardcode example twist
  const twistText = "BREAKING NEWS: Another murder has happened! All alibis must be rechecked.";

  const handleContinue = () => {
    // Go back to narrative or discussion phase
    router.push('/(game)/NarrativeScreen');
  };

  return (
    <View style={[utl.flex1, utl.bgDark, utl.justifyCenter, utl.px24]}>
      <Text style={[utl.textGold, utl.textCenter, utl.text3xl, utl.fontJostBold, utl.mb24]}>
        Game Twist!
      </Text>

      <Text style={[utl.textLight, utl.textBase, utl.fontInter, utl.mb24]}>
        {twistText}
      </Text>

      <Pressable
        onPress={handleContinue}
        style={[
          utl.bgPrimary,
          utl.py12,
          utl.px16,
          utl.roundedLg,
          utl.itemsCenter,
          utl.wFull,
        ]}
      >
        <Text style={[utl.textDark, utl.fontJostMedium, utl.textBase]}>Continue</Text>
      </Pressable>
    </View>
  );
}
