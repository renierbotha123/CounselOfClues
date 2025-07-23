import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '../../src/api/api';
import { utl } from '../../styles/utl';
import PrimaryButton from '../../components/PrimaryButtons';
import GoToLobbyButton from '../../components/GoToLobbyButton';


export default function ResultsScreen() {
  const router = useRouter();
  const { gameId: g, playerId: p } = useLocalSearchParams();
const gameId = Array.isArray(g) ? g[0] : g || '';
const playerId = Array.isArray(p) ? p[0] : p || '';

  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [murderer, setMurderer] = useState<string | null>(null);

  useEffect(() => {
    if (!gameId) return;

    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/players/game/${gameId}`);
        setPlayers(res.data);

        const found = res.data.find((p: any) => p.role === 'Murderer');
        setMurderer(found ? found.player_name : null);
      } catch (error) {
        console.error('❌ Error fetching players for results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [gameId]);

  if (!gameId) {
    return (
      <View style={[utl.flex1, utl.bgDark, utl.itemsCenter, utl.justifyCenter]}>
        <Text style={[utl.textError, utl.textBase, utl.fontInter]}>
          Error: No Game ID.
        </Text>
      </View>
    );
  }

  return (
    <View style={[utl.flex1, utl.bgDark, utl.p24]}>
      <Text style={[utl.textGold, utl.textCenter, utl.text3xl, utl.fontJostBold, utl.mb16]}>
        🎉 Game Over
      </Text>

      <Text style={[utl.textLight, utl.textCenter, utl.textBase, utl.fontInter, utl.mb16]}>
        Thank you for playing! Here are the final roles:
      </Text>

      {loading ? (
        <Text style={[utl.textLight, utl.textBase, utl.fontInter]}>
          Loading results...
        </Text>
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[utl.bgSurface, utl.roundedMd, utl.p16, utl.mb12]}>
              <Text style={[utl.textDark, utl.fontInter, utl.textBase]}>
                {item.player_name}
              </Text>
              <Text style={[utl.textDark, utl.fontInter, utl.textSm]}>
                Role: {item.role || '❓'}
              </Text>
              {item.vote_count !== undefined && (
                <Text style={[utl.textDark, utl.fontInter, utl.textSm]}>
                  Votes: {item.vote_count}
                </Text>
              )}
            </View>
          )}
        />
      )}

      {murderer && (
        <View style={[utl.bgPrimary, utl.roundedMd, utl.p16, utl.my16]}>
          <Text style={[utl.textDark, utl.textCenter, utl.fontJostBold, utl.textLg]}>
            💀 The Murderer Was: {murderer}!
          </Text>
        </View>
      )}

      <PrimaryButton
        title="Back to Home"
        onPress={() => router.replace('/')}
      />
      <GoToLobbyButton gameId={gameId} playerId={playerId} />

    </View>
    
  );
}
