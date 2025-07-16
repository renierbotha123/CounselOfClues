import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../../src/api/api';
import { utl } from '../../styles/utl';

export default function CreateGameScreen() {
  const [theme, setTheme] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateGame = async () => {
    if (!theme.trim() || !playerName.trim()) {
      console.error('❌ Theme and Name required');
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create the game (with placeholder created_by)
      const gameResponse = await api.post('/games', {
        theme,
        created_by: null
      });
      const gameId = gameResponse.data.id;
      console.log('✅ Game created with ID:', gameId);

      // 2️⃣ Add the admin as first player
      const playerResponse = await api.post('/players', {
        game_id: gameId,
        player_name: playerName
      });
      const playerId = playerResponse.data.id;
      console.log('✅ Admin added as player ID:', playerId);

      // 3️⃣ Patch game with created_by
      await api.patch(`/games/${gameId}/status`, {
        status: 'waiting',
        created_by: playerId
      });
      console.log('✅ Game updated with admin ID.');

      // 4️⃣ Navigate to Lobby
      router.replace(`/game/LobbyScreen?gameId=${gameId}&playerId=${playerId}`);

    } catch (error) {
      console.error('❌ Error creating game:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={[utl.flex1, utl.bgDark, utl.p24]}>
      <Text style={[utl.textGold, utl.textCenter, utl.text3xl, utl.fontJostBold, utl.mb24]}>
        Create New Game
      </Text>

      <Text style={[utl.textLight, utl.mb8]}>
        Theme
      </Text>
      <TextInput
        value={theme}
        onChangeText={setTheme}
        placeholder="e.g. Murder Mystery"
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

      <Text style={[utl.textLight, utl.mb8]}>
        Your Name
      </Text>
      <TextInput
        value={playerName}
        onChangeText={setPlayerName}
        placeholder="e.g. Victor"
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
        onPress={handleCreateGame}
        disabled={loading}
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
          {loading ? 'Creating...' : 'Create Game'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}
