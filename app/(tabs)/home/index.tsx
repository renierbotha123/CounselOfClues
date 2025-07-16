import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';
import api from '../../../src/api/api';


export default function HomeScreen() {
  useEffect(() => {
    const testApi = async () => {
      try {
        const response = await api.get('/');
        console.log('✅ API Response:', response.data);
      } catch (error) {
        console.error('❌ API Error:', error);
      }
    };

    testApi();
  }, []);

 const handleCreateGame = () => {
  router.push('/game/CreateGameScreen');
};



  return (
    <View style={{ flex: 1, backgroundColor: '#121212', padding: 24 }}>
      <Text style={{ color: '#FFD700', fontSize: 28, marginBottom: 20 }}>
        Counsel of Clues
      </Text>
      <Text style={{ color: '#ccc', marginBottom: 40 }}>
        Welcome! Start or join a game.
      </Text>

      <Button
        title="Create Game"
        color="#CBA84E"
        onPress={handleCreateGame}
      />
      <View style={{ height: 12 }} />
      <Button
        title="Join Game"
        color="#CBA84E"
        onPress={() => router.push('/game/JoinScreen')}
      />
    </View>
  );
}
