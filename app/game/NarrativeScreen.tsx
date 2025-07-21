import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, Animated, Easing } from 'react-native';
import { utl } from '../../styles/utl';
import PrimaryButton from '../../components/PrimaryButtons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '../../src/api/api';

export default function NarrativeScreen() {
  const router = useRouter();
  const { gameId, playerId, round: roundParam } = useLocalSearchParams();
  const round = parseInt((Array.isArray(roundParam) ? roundParam[0] : roundParam) || '1', 10);

  const [narrative, setNarrative] = useState('');
  const [clue, setClue] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPenalized, setIsPenalized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dotOpacity = useRef(new Animated.Value(0)).current;

  // Fetch game + player data
  useEffect(() => {
    if (!gameId || !playerId) return;

    const fetchGameAndPlayer = async () => {
      try {
        const gameRes = await api.get(`/games/${gameId}`);
        const createdBy = gameRes.data.created_by?.toString();
        setIsAdmin(playerId === createdBy);

        const playerRes = await api.get(`/players/${playerId}`);
        const penalizedRound = playerRes.data.penalized_round;
        setIsPenalized(Boolean(penalizedRound && round === penalizedRound));
      } catch (error) {
        console.error('❌ Error fetching game/player:', error);
      }
    };

    fetchGameAndPlayer();
  }, [gameId, playerId, round]);

  // Poll for narrative until it's ready
  useEffect(() => {
    if (!gameId || isNaN(round)) return;

    setIsLoading(true);
    setDisplayedText('');
    let intervalId: NodeJS.Timeout;

    const pollForNarrative = async () => {
      try {
        const response = await api.get(`/narratives/game/${gameId}?round=${round}`);

        const story = response.data.narrative;
        const clueText = response.data.clue;

        if (story && story.length > 0 && !story.includes('goes here')) {
          setNarrative(story);
          setClue(clueText);
          setIsLoading(false);
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error('❌ Error polling narrative:', error);
      }
    };

    intervalId = setInterval(pollForNarrative, 3000);

    return () => clearInterval(intervalId);
  }, [gameId, round]);

  // ✍️ Typewriter effect
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setDisplayedText('');
      for (let i = 0; i < narrative.length; i++) {
        if (cancelled) break;
        setDisplayedText((prev) => prev + narrative[i]);
        await new Promise((r) => setTimeout(r, 20));
      }
    };

    if (!isLoading && narrative) run();

    return () => { cancelled = true; };
  }, [narrative, isLoading]);

  // 🔘 Dots animation while loading
  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dotOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
          Animated.timing(dotOpacity, { toValue: 0, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    } else {
      dotOpacity.setValue(0);
    }
  }, [isLoading]);

  const handleCallVote = async () => {
    await api.patch(`/players/${playerId}/vote-caller`, { game_id: gameId, round });
    router.push(`/game/VotingScreen?gameId=${gameId}&playerId=${playerId}&round=${round}`);
  };

  const handleContinue = () => {
    router.push(`/game/QuestionScreen?gameId=${gameId}&playerId=${playerId}&round=${round + 1}`);
  };

  return (
    <ScrollView style={[utl.flex1, utl.bgDark, utl.px24, utl.py32]}>
      <Text style={[utl.textGold, utl.textCenter, utl.text2xl, utl.fontJostBold, utl.mb8]}>
        The Scene Unfolds
      </Text>
      <Text style={[utl.textLight, utl.textCenter, utl.textBase, utl.fontInter, utl.mb16]}>
        🌀 Round {round}
      </Text>

      {isLoading ? (
        <Text style={[utl.textLight, utl.textCenter]}>
          Waiting for all players to answer
          <Animated.Text style={{ opacity: dotOpacity }}>...</Animated.Text>
        </Text>
      ) : (
        <>
          <Text style={[utl.textLight, utl.fontInter, utl.textBase, utl.mb24]}>
            {displayedText}
          </Text>

          <View style={[utl.bgSurface, utl.roundedMd, utl.p16, utl.my12]}>
            <Text style={[utl.textDark, utl.fontInter, utl.textBase]}>Clue:</Text>
            <Text style={[utl.textDark, utl.fontJostMedium, utl.textLg]}>{clue}</Text>
          </View>

          {!isPenalized && (
            <PrimaryButton title="Call for Vote" onPress={handleCallVote} />
          )}
          {isAdmin && (
            <PrimaryButton title="Continue" onPress={handleContinue} />
          )}
        </>
      )}
    </ScrollView>
  );
}
