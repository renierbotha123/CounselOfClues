import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '../../src/api/api';
import { utl } from '../../styles/utl';
import GoToLobbyButton from '../../components/GoToLobbyButton';

export default function VotingScreen() {
  const router = useRouter();
  const { gameId: g, playerId: p, round: r } = useLocalSearchParams();

const gameId = Array.isArray(g) ? g[0] : g || '';
const playerId = Array.isArray(p) ? p[0] : p || '';
const round = parseInt(Array.isArray(r) ? r[0] : r || '1', 10);

console.log('VotingScreen loaded with gameId:', gameId, 'playerId:', playerId, 'round:', round);

  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPenalized, setIsPenalized] = useState(false);

  // ✅ Fetch players
  useEffect(() => {
    if (!gameId) return;

    const fetchPlayers = async () => {
      try {
        const res = await api.get(`/players/game/${gameId}`);
        setPlayers(res.data);

        // Check if THIS player is penalized for this round
        const me = res.data.find((p: any) => p.id.toString() === playerId);
        if (me && me.penalized_round === round) {
          setIsPenalized(true);
        } else {
          setIsPenalized(false);
        }

      } catch (error) {
        console.error('❌ Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [gameId, playerId, round]);

  const handleVote = async (selectedPlayerId: string) => {
    if (isPenalized) {
      console.warn('❌ You are penalized and cannot vote this round.');
      return;
    }

    console.log('✅ Voted for:', selectedPlayerId);

    // OPTIONAL: Save vote to server here in future

    // Navigate to SummaryScreen
    router.push(`/game/SummaryScreen?gameId=${gameId}&playerId=${playerId}&round=${round}&votedForId=${selectedPlayerId}`);
  };

  // ✅ Safety check
  if (!gameId || !playerId || isNaN(round)) {
    return (
      <View style={[utl.flex1, utl.bgDark, utl.itemsCenter, utl.justifyCenter]}>
        <Text style={[utl.textError, utl.textBase, utl.fontInter]}>
          Error: Missing or invalid game data.
        </Text>
      </View>
    );
  }

  return (
    <View style={[utl.flex1, utl.bgDark, utl.p24]}>
      <Text style={[utl.textGold, utl.textCenter, utl.text2xl, utl.fontJostBold, utl.mb8]}>
        Who do you suspect?
      </Text>
      <Text style={[utl.textLight, utl.textCenter, utl.textBase, utl.fontInter, utl.mb16]}>
        🌀 Round {round}
      </Text>

      {isPenalized && (
        <Text style={[utl.textError, utl.textCenter, utl.textBase, utl.fontInter, utl.mb16]}>
          You are penalized this round and cannot vote.
        </Text>
      )}

      {loading ? (
        <Text style={[utl.textLight, utl.textBase, utl.fontInter]}>
          Loading players...
        </Text>
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            // Don't show vote button if they are penalized or self
            const disableVote = isPenalized || item.id.toString() === playerId;

            return (
              <View style={[utl.bgSurface, utl.roundedMd, utl.p16, utl.mb12]}>
                <Text style={[utl.textDark, utl.fontInter, utl.textBase, utl.mb8]}>
                  {item.player_name}
                </Text>
                <Pressable
                  style={[
                    disableVote ? utl.bgDisabled : utl.bgPrimary,
                    utl.p12,
                    utl.roundedMd,
                    utl.itemsCenter
                  ]}
                  disabled={disableVote}
                  onPress={() => handleVote(item.id)}
                >
                  <Text style={[
                    disableVote ? utl.textMuted : utl.textDark,
                    utl.fontJostMedium
                  ]}>
                    {disableVote ? 'Cannot Vote' : `Vote for ${item.player_name}`}
                  </Text>
                </Pressable>
              </View>
            );
          }}
        />
      )}

      <GoToLobbyButton gameId={gameId} playerId={playerId} />

    </View>
    
  );
}
