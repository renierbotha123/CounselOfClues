import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, Text } from 'react-native';

export default function Index() {
  useEffect(() => {
    // Automatically go to tabs (or onboarding if logged out)
    router.replace('/onboarding/WelcomeScreen');
  }, []);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#121212'
    }}>
      <Text style={{ color: '#fff' }}>Loading...</Text>
    </View>
  );
}
