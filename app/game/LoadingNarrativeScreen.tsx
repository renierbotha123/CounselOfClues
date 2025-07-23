import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { utl } from '../../styles/utl';
import api from '../../src/api/api';
import GoToLobbyButton from '../../components/GoToLobbyButton';

export default function LoadingNarrativeScreen() {
  const router = useRouter();
  const { gameId: g, playerId: p, round: r } = useLocalSearchParams();

  const gameId = Array.isArray(g) ? g[0] : g || '';
  const playerId = Array.isArray(p) ? p[0] : p || '';
  const round = parseInt(Array.isArray(r) ? r[0] : r || '1', 10);

  const [tries, setTries] = useState(0);
  const maxTries = 30;

  useEffect(() => {
    if (!gameId || !playerId) return;

    const checkNarrative = async () => {
      try {
        const res = await api.get(`/answers/${gameId}/${playerId}/${round}`);
        const story = res.data?.narrative;
        const clue = res.data?.clue;

        if (story && story.length > 0) {
          router.replace(`/game/NarrativeScreen?gameId=${gameId}&playerId=${playerId}&round=${round}`);
        } else if (tries < maxTries) {
          setTimeout(() => setTries((t) => t + 1), 2000);
        } else {
          // fallback after too many tries
          router.replace(`/game/NarrativeScreen?gameId=${gameId}&playerId=${playerId}&round=${round}`);
        }
      } catch (err) {
        console.error('❌ Failed to fetch narrative:', err);
        setTimeout(() => setTries((t) => t + 1), 2000);
      }
    };

    checkNarrative();
  }, [tries, gameId, playerId, round]);

  return (
    <View style={[utl.flex1, utl.bgDark, utl.itemsCenter, utl.justifyCenter, utl.px24]}>
      <Text style={[utl.textLight, utl.textLg, utl.textCenter, utl.fontInter, utl.mb12]}>
        🧠 Crafting your mystery...
      </Text>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={[utl.textLight, utl.textCenter, utl.mt16]}>
        Please wait while the AI prepares the next scene for round {round}.
      </Text>
      <GoToLobbyButton gameId={gameId} playerId={playerId} />
    </View>
  );
}
