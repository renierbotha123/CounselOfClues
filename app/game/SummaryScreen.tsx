import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import PrimaryButton from '../../components/PrimaryButtons';
import { utl } from '../../styles/utl';
import api from '../../src/api/api';
import GoToLobbyButton from '../../components/GoToLobbyButton';

export default function SummaryScreen() {
  const router = useRouter();
  const { gameId: g, playerId: p, round: r, votedForId: v } = useLocalSearchParams();

const gameId = Array.isArray(g) ? g[0] : g || '';
const playerId = Array.isArray(p) ? p[0] : p || '';
const round = parseInt(Array.isArray(r) ? r[0] : r || '1', 10);
const votedForId = Array.isArray(v) ? v[0] : v || '';


  console.log('SummaryScreen loaded with', { gameId, playerId, round, votedForId });

  const [isAdmin, setIsAdmin] = useState(false);
  const [callerId, setCallerId] = useState<string | null>(null);
  const [isCaller, setIsCaller] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Load game and caller info
  useEffect(() => {
    if (!gameId || !playerId) return;

    const fetchInfo = async () => {
      try {
        setLoading(true);

        // Get game to see admin
        const gameRes = await api.get(`/games/${gameId}`);
        const createdBy = gameRes.data.created_by?.toString();
        if (playerId === createdBy) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }

        // Get vote caller
        const playersRes = await api.get(`/players/game/${gameId}`);
        const foundCaller = playersRes.data.find((p: any) => p.vote_called_round === round);
        if (foundCaller) {
          setCallerId(foundCaller.id.toString());
          setIsCaller(foundCaller.id.toString() === playerId);
        } else {
          setCallerId(null);
          setIsCaller(false);
        }

      } catch (error) {
        console.error('❌ Error loading summary screen data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [gameId, playerId, round]);

  // ✅ Handler for admin to continue
  const handleContinue = async () => {
    try {
      if (callerId && callerId !== votedForId) {
        console.log('✅ Caller was wrong. Penalizing.');
        await api.patch(`/players/${callerId}/penalize`, { round: round + 1 });
      }

      // Decide next route
      const nextRound = round + 1;
      if (nextRound > 3) {
        router.replace(`/game/ResultsScreen?gameId=${gameId}`);
      } else {
        router.push(`/game/QuestionScreen?gameId=${gameId}&playerId=${playerId}&round=${nextRound}`);
      }

    } catch (error) {
      console.error('❌ Error in handleContinue:', error);
    }
  };

  if (!gameId || !playerId || isNaN(round) || !votedForId) {
    return (
      <View style={[utl.flex1, utl.bgDark, utl.itemsCenter, utl.justifyCenter]}>
        <Text style={[utl.textError, utl.textBase, utl.fontInter]}>
          Error: Missing game or vote data.
        </Text>
      </View>
    );
  }

  return (
    <View style={[utl.flex1, utl.bgDark, utl.p24]}>
      <Text style={[utl.textGold, utl.textCenter, utl.text2xl, utl.fontJostBold, utl.mb8]}>
        Voting Recap
      </Text>
      <Text style={[utl.textLight, utl.textCenter, utl.textBase, utl.fontInter, utl.mb16]}>
        🌀 Round {round}
      </Text>

      {loading ? (
        <Text style={[utl.textLight, utl.textBase, utl.fontInter]}>
          Loading...
        </Text>
      ) : (
        <>
          <Text style={[utl.textLight, utl.textBase, utl.fontInter, utl.mb12]}>
            ✅ You voted for player ID: {votedForId}
          </Text>

          <View style={[utl.bgSurface, utl.roundedMd, utl.p16, utl.my16]}>
            <Text style={[utl.textDark, utl.fontInter, utl.textBase]}>
              💀 Vote Caller: {callerId || 'None'}
            </Text>
            <Text style={[utl.textDark, utl.fontInter, utl.textBase]}>
              {callerId === votedForId
                ? '✅ The caller chose correctly!'
                : '⚠️ If the caller was wrong, they will be penalized next round.'}
            </Text>
          </View>

          {isAdmin ? (
            <PrimaryButton
              title="Continue to Next Round"
              onPress={handleContinue}
            />
          ) : (
            <Text style={[utl.textLight, utl.textCenter, utl.textBase, utl.fontInter, utl.mt16]}>
              Waiting for Admin to continue...
            </Text>
          )}
        </>
      )}
      <GoToLobbyButton gameId={gameId} playerId={playerId} />

    </View>
  );
}
