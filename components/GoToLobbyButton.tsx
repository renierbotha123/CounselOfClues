import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  gameId: string;
  playerId: string;
}

export default function GoToLobbyButton({ gameId, playerId }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={() => router.replace(`/game/LobbyScreen?gameId=${gameId}&playerId=${playerId}`)}
    >
      <Ionicons name="home" size={24} color="white" />
      <Text style={styles.text}>Lobby</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 3,
  },
  text: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 14,
  },
});
