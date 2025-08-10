import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, Animated } from 'react-native';
import { utl } from '../../styles/utl';
import PrimaryButton from '../../components/PrimaryButtons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '../../src/api/api';
import GoToLobbyButton from '../../components/GoToLobbyButton';

export default function NarrativeScreen() {
  const router = useRouter();
  const { gameId: g, playerId: p, round: roundParam } = useLocalSearchParams();

  const gameId = Array.isArray(g) ? g[0] : g || '';
  const playerId = Array.isArray(p) ? p[0] : p || '';
  const round = parseInt((Array.isArray(roundParam) ? roundParam[0] : roundParam) || '1', 10);

  const [narrative, setNarrative] = useState('');
  const [clue, setClue] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPenalized, setIsPenalized] = useState(false);

  const dotOpacity = useRef(new Animated.Value(0)).current;

  // ✅ Fetch game + player info
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const gameRes = await api.get(`/games/${gameId}`);
        setIsAdmin(playerId === gameRes.data.created_by?.toString());

        const playerRes = await api.get(`/players/${playerId}`);
        const penalizedRound = playerRes.data.penalized_round;
        setIsPenalized(Boolean(penalizedRound && round === penalizedRound));
      } catch (err) {
        console.error('❌ Failed to fetch game/player info:', err);
      }
    };
    if (gameId && playerId) fetchMeta();
  }, [gameId, playerId, round]);

  // ✅ Get narrative + clue
  useEffect(() => {
    console.log(`🔍 Fetching narrative from /answers/${gameId}/${playerId}/${round}`);

    console.log('🧪 Final narrative state:', narrative);
console.log('🧪 Final clue state:', clue);

  if (!gameId || !playerId || !round) return;

  const fetchStory = async () => {
    try {
      const res = await api.get(`/answers/${gameId}/${playerId}/${round}`);
      if (res.data) {
        console.log('📦 Narrative response:', res.data);
        setNarrative(res.data.narrative || '');
        setClue(res.data.clue || '');
        console.log('📢 Story received:', res.data.narrative);
console.log('📢 Clue received:', res.data.clue);

      }
    } catch (err) {
      console.error('❌ Error fetching narrative:', err);
    }
  };

  fetchStory();
}, [gameId, playerId, round]);

  // ✅ Typewriter effect
  useEffect(() => {
    if (!narrative) return;

    let cancelled = false;
    setDisplayedText('');
    const run = async () => {
      for (let i = 0; i < narrative.length; i++) {
        if (cancelled) break;
        setDisplayedText((prev) => prev + narrative[i]);
        await new Promise((r) => setTimeout(r, 15));
      }
    };
    run();
    return () => { cancelled = true; };
  }, [narrative]);

  useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(dotOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(dotOpacity, { toValue: 0, duration: 500, useNativeDriver: true }),
    ])
  ).start();
}, []);

  const handleCallVote = async () => {
    await api.patch(`/players/${playerId}/vote-caller`, { game_id: gameId, round });
    router.push(`/game/VotingScreen?gameId=${gameId}&playerId=${playerId}&round=${round}`);
  };

const handleContinue = () => {
  if (round === 1) {
    // First round: go to questions that were already generated
    router.push(`/game/QuestionScreen?gameId=${gameId}&playerId=${playerId}&round=${round}`);
  } else {
    // Later rounds: go to next narrative (AI will generate narrative + questions after answers)
    router.push(`/game/LoadingNarrativeScreen?gameId=${gameId}&playerId=${playerId}&round=${round + 1}`);
  }
};


  return (
    <ScrollView style={[utl.flex1, utl.bgDark, utl.px24, utl.py32]}>
      <Text style={[utl.textGold, utl.textCenter, utl.text2xl, utl.fontJostBold, utl.mb8]}>
        The Scene Unfolds
      </Text>
      <Text style={[utl.textLight, utl.textCenter, utl.textBase, utl.fontInter, utl.mb16]}>
        🌀 Round {round}
      </Text>

      {narrative ? (
        <>
          <Text style={[utl.textLight, utl.fontInter, utl.textBase, utl.mb24]}>
            {displayedText}
          </Text>

          <View style={[utl.bgSurface, utl.roundedMd, utl.p16, utl.my12]}>
            <Text style={[utl.textDark, utl.fontInter, utl.textBase]}>Clue:</Text>
            <Text style={[utl.textDark, utl.fontJostMedium, utl.textLg]}>{clue}</Text>
          </View>

         {!isPenalized && round > 1 && (
  <PrimaryButton title="Call for Vote" onPress={handleCallVote} />
)}

          {isAdmin && (
            <PrimaryButton style={[utl.mb12]} title="Continue" onPress={handleContinue} />
          )}
        </>
      ) : (
        <Text style={[utl.textLight, utl.textCenter]}>
          Waiting for the story to arrive
          <Animated.Text style={{ opacity: dotOpacity }}>...</Animated.Text>
        </Text>
      )}

      <GoToLobbyButton gameId={gameId} playerId={playerId} />
    </ScrollView>
  );
}
