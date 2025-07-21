import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { View, Text, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import api from '../../src/api/api';
import { utl } from '../../styles/utl';
import { Pressable } from 'react-native';


export default function LobbyScreen() {
  const { gameId, playerId } = useLocalSearchParams();
  console.log('LobbyScreen loaded with gameId:', gameId, 'playerId:', playerId);
  const [players, setPlayers] = useState<any[]>([]);
  const [gameStatus, setGameStatus] = useState('');
  const [gameAdminId, setGameAdminId] = useState('');
  const isAdmin = playerId === gameAdminId;


      const fetchPlayers = async () => {
      try {
        const response = await api.get(`/players/game/${gameId}`);
        console.log('✅ Players:', response.data);
        setPlayers(response.data);
      } catch (error) {
        console.error('❌ Error fetching players:', error);
      }
    };

    const fetchGameInfo = async () => {
      
  try {
    const response = await api.get(`/games/${gameId}`);
    setGameStatus(response.data.status);
    setGameAdminId(response.data.created_by?.toString() || '');
    console.log('✅ Game Info:', response.data);
console.log('✅ Admin ID (from DB):', response.data.created_by);
console.log('✅ Your playerId (from URL):', playerId);
console.log('✅ Computed isAdmin:', playerId === response.data.created_by?.toString());

  } catch (error) {
    console.error('❌ Error fetching game info:', error);
  }
};


  
 useEffect(() => {
  if (!gameId) return;

  // Fetch immediately on load
  fetchPlayers();
  fetchGameInfo();

  // Set interval to poll every 5 seconds
  const interval = setInterval(() => {
    fetchPlayers();
    fetchGameInfo();
  }, 5000);

  // Cleanup on unmount
  return () => clearInterval(interval);
}, [gameId]);

useEffect(() => {
  const checkAndNavigate = async () => {
    if (gameStatus !== 'in-progress' || !gameId || !playerId) return;

    try {
      // Check if questions are available for this player yet
      const res = await api.get(`/questions/game/${gameId}/player/${playerId}?round=1`);

      if (res.data.length > 0) {
        router.replace(`/game/QuestionScreen?gameId=${gameId}&playerId=${playerId}&round=1`);
      } else {
        console.log('⏳ Questions not ready yet, retrying in 2s...');
        setTimeout(checkAndNavigate, 2000);
      }
    } catch (err) {
      console.error('❌ Failed checking for questions:', err);
      setTimeout(checkAndNavigate, 2000); // Retry anyway
    }
  };

  checkAndNavigate();
}, [gameStatus]);



const handleStartGame = async () => {
  try {
    await api.post(`/games/${gameId}/start`, {
      playerId: playerId, // 👈 include this!
    });
    console.log('✅ Game started!');
    fetchGameInfo(); // Refresh status after starting
  } catch (error) {
    console.error('❌ Error starting game:', error);
    console.log('Starting game as playerId:', playerId);

  }
};



const getStatusLabel = (status: string) => {
  switch (status) {
    case 'waiting':
      return 'Waiting for Players';
    case 'in-progress':
      return 'Game In Progress';
    case 'complete':
      return 'Game Complete';
    case 'paused':
      return 'Game Paused';
    case 'starting':
      return 'Starting Soon';
    default:
      return status;
  }
};


  return (
    <View style={[utl.flex1, utl.bgDark, utl.p24]}>
    <Text style={[utl.textGold, utl.textCenter, utl.text3xl, utl.fontJostBold, utl.mb8]}>
  Lobby - Game ID: {gameId}
</Text>
<Text style={[utl.textLight, utl.textCenter, utl.textBase, utl.fontInter, utl.mb16]}>
  Status: {getStatusLabel(gameStatus)}
</Text>


{gameStatus === 'waiting' && (
  <Text style={[utl.textLight, utl.textCenter, utl.textSm, utl.fontInter, utl.mb16]}>
    Waiting for enough players. Roles will be assigned automatically.
  </Text>
)}

{gameStatus === 'in-progress' && (
  <Text style={[utl.textLight, utl.textCenter, utl.textSm, utl.fontInter, utl.mb16]}>
    Game in progress! Roles have been assigned.
  </Text>
)}




      <FlatList
        data={players}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[utl.bgSurface, utl.roundedMd, utl.p16, utl.mb12]}>
  <Text style={[utl.textDark, utl.fontJostMedium, utl.textBase]}>
    {item.player_name}
  </Text>
  <Text style={[utl.textDark, utl.fontInter, utl.textSm]}>
    Role: {item.role ? item.role : '❓ No role yet'}
  </Text>
</View>

        )}
      />
   
{isAdmin && gameStatus === 'waiting' && (
  <>
    <Text style={[
      utl.textLight,
      utl.textCenter,
      utl.textSm,
      utl.fontInter,
      utl.mb8
    ]}>
      {players.length < 3
        ? `Need at least 3 players to start (currently ${players.length})`
        : 'Ready to start the game'}
    </Text>

    <Pressable
      onPress={handleStartGame}
      disabled={players.length < 3}
      style={[
        utl.bgPrimary,
        utl.p16,
        utl.roundedMd,
        utl.itemsCenter,
        players.length < 3 && { opacity: 0.5 }
      ]}
    >
      <Text style={[
        utl.textDark,
        utl.fontJostMedium,
        utl.textBase
      ]}>
        Start Game
      </Text>
    </Pressable>
  </>
)}

    </View>
    
  );
}
