import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { router } from 'expo-router';
import api from '../../src/api/api';
import { utl } from '../../styles/utl';

export default function JoinScreen() {
  const [gameId, setGameId] = useState('');
  const [playerName, setPlayerName] = useState('');

  const handleJoinGame = async () => {
  if (!gameId || !playerName) {
    console.error('❌ Please enter both Game ID and Player Name.');
    return;
  }

  try {
    const response = await api.post('/players', {
      game_id: gameId,
      player_name: playerName,
    });
    const newPlayerId = response.data.id;
    console.log('✅ Joined game as:', response.data);

    router.push(`/game/LobbyScreen?gameId=${gameId}&playerId=${newPlayerId}`);
  } catch (error) {
    console.error('❌ Error joining game:', error);
  }
};


  return (
    <View style={[utl.flex1, utl.bgDark, utl.p24]}>
      <Text style={[
        utl.textGold,
        utl.textCenter,
        utl.text3xl,
        utl.fontJostBold,
        utl.mb24
      ]}>
        Join a Game
      </Text>

      <Text style={[utl.textLight, utl.mb8]}>Game ID</Text>
      <TextInput
        value={gameId}
        onChangeText={setGameId}
        placeholder="Enter Game ID"
        placeholderTextColor="#888"
        style={[
          utl.wFull,
          utl.bgSurface,
          utl.textDark,
          utl.p12,
          utl.roundedMd,
          utl.mb16
        ]}
      />

      <Text style={[utl.textLight, utl.mb8]}>Your Name</Text>
      <TextInput
        value={playerName}
        onChangeText={setPlayerName}
        placeholder="Enter your name"
        placeholderTextColor="#888"
        style={[
          utl.wFull,
          utl.bgSurface,
          utl.textDark,
          utl.p12,
          utl.roundedMd,
          utl.mb24
        ]}
      />

      <Pressable
        onPress={handleJoinGame}
        style={[
          utl.bgPrimary,
          utl.p16,
          utl.roundedMd,
          utl.itemsCenter
        ]}
      >
        <Text style={[
          utl.textDark,
          utl.fontJostMedium,
          utl.textBase
        ]}>
          Join Game
        </Text>
      </Pressable>
    </View>
  );
 }
