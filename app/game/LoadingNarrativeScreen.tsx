import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { utl } from '../../styles/utl';
import api from '../../src/api/api';

export default function LoadingNarrativeScreen() {
  const router = useRouter();
  const { gameId, playerId, round: roundParam } = useLocalSearchParams();
  const round = parseInt((Array.isArray(roundParam) ? roundParam[0] : roundParam) || '1', 10);

  useEffect(() => {
    if (!gameId || !playerId) return;

    const poll = async () => {
      let tries = 0;
      const maxTries = 30;

      const check = async () => {
        try {
          const res = await api.get(`/narratives/game/${gameId}?round=${round}`);
          if (res.data?.narrative && !res.data.narrative.includes('goes here')) {
            router.replace(`/game/NarrativeScreen?gameId=${gameId}&playerId=${playerId}&round=${round}`);
          } else if (tries < maxTries) {
            tries++;
            setTimeout(check, 2000);
          } else {
            router.replace(`/game/NarrativeScreen?gameId=${gameId}&playerId=${playerId}&round=${round}`);
          }
        } catch (err) {
          console.error('❌ Failed to poll narrative:', err);
        }
      };

      check();
    };

    poll();
  }, [gameId, playerId, round]);

  return (
    <View style={[utl.flex1, utl.bgDark, utl.itemsCenter, utl.justifyCenter]}>
      <Text style={[utl.textLight, utl.textLg, utl.textCenter, utl.fontInter]}>
        Preparing the story for round {round}...
      </Text>
    </View>
  );
}
