import React from 'react';
import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function RoleScreen() {
  const handleContinue = () => {
    router.push('/game/NarrativeScreen');
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#121212' }}>
      <Text style={{ color: '#FFD700', fontSize: 24, marginBottom: 20 }}>Your Role</Text>

      <Text style={{ color: '#fff', marginBottom: 12 }}>Role: Butler</Text>
      <Text style={{ color: '#ccc', marginBottom: 20 }}>Clue: You saw someone leaving the library.</Text>

      <Button title="Continue" onPress={handleContinue} />

        <Button
            title="Exit to Home"
            color="#888"
            onPress={() => router.replace('/(tabs)/home')}/>

    </View>
  );
}
