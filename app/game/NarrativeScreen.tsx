import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, Animated, Easing } from 'react-native';
import { utl } from '../../styles/utl';
import PrimaryButton from '../../components/PrimaryButtons';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '../../src/api/api';

export default function NarrativeScreen() {
  const router = useRouter();
  const { gameId, playerId, round: roundParam } = useLocalSearchParams();
  const round = parseInt((Array.isArray(roundParam) ? roundParam[0] : roundParam) || '1', 10);
  console.log('NarrativeScreen loaded with gameId:', gameId, 'playerId:', playerId, 'round:', round);

  const [isLoading, setIsLoading] = useState(true);
  const [narrative, setNarrative] = useState('');
  const [clue, setClue] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPenalized, setIsPenalized] = useState(false);

  const dotOpacity = useRef(new Animated.Value(0)).current;

  // ✅ Fetch game and player data
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
        console.error('❌ Error fetching game or player info:', error);
      }
    };

    fetchGameAndPlayer();
  }, [gameId, playerId, round]);

  // ✅ Fetch narrative + clue
  useEffect(() => {
    const fetchNarrative = async () => {
      if (!gameId || isNaN(round)) return;
      setDisplayedText('');
      setIsLoading(true);

      try {
        console.log('Fetching narrative for gameId:', gameId, 'round:', round);
        const response = await api.get(`/narratives/game/${gameId}?round=${round}`);

        setNarrative(response.data.narrative);
        setClue(response.data.clue);
      } catch (error) {
        console.error('❌ Error fetching narrative:', error);
        setNarrative('It was a stormy night in the old manor.');
        setClue('Blood has been found near the stairs.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNarrative();
  }, [gameId, round]);

  // ✅ Typewriter
  useEffect(() => {
    let isCancelled = false;

    const runTypewriter = async () => {
      setDisplayedText('');
      for (let i = 0; i < narrative.length; i++) {
        if (isCancelled) break;
        setDisplayedText(prev => prev + narrative[i]);
        await new Promise(resolve => setTimeout(resolve, 20));
      }
    };

    if (!isLoading && narrative) {
      runTypewriter();
    }

    return () => { isCancelled = true; };
  }, [isLoading, narrative]);

  // ✅ Animated dots
  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dotOpacity, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(dotOpacity, {
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      dotOpacity.setValue(0);
    }
  }, [isLoading]);

  // ✅ Handlers
  const handleCallVote = async () => {
    if (!gameId || !playerId || isNaN(round)) return;
    await api.patch(`/players/${playerId}/vote-caller`, { game_id: gameId, round });
    router.push(`/game/VotingScreen?gameId=${gameId}&playerId=${playerId}&round=${round}`);
  };

  const handleContinue = () => {
    if (!gameId || !playerId || isNaN(round)) return;
    router.push(`/game/QuestionScreen?gameId=${gameId}&playerId=${playerId}&round=${round + 1}`);
  };

  // ✅ Guard for missing
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
    <ScrollView style={[utl.flex1, utl.bgDark, utl.px24, utl.py32]}>
      <Text style={[utl.textGold, utl.textCenter, utl.text2xl, utl.fontJostBold, utl.mb8]}>
        The Scene Unfolds
      </Text>
      <Text style={[utl.textLight, utl.textCenter, utl.textBase, utl.fontInter, utl.mb16]}>
        🌀 Round {round}
      </Text>

      {isLoading ? (
        <View>
          <Text style={[utl.textLight, utl.fontInter, utl.textBase]}>
            Boiling the kettle of suspense
            <Animated.Text style={{ opacity: dotOpacity }}>...</Animated.Text>
          </Text>
        </View>
      ) : (
        <>
          <Text style={[utl.textLight, utl.fontInter, utl.textBase, utl.mb24]}>
            {displayedText}
          </Text>

          <View style={[utl.bgSurface, utl.roundedMd, utl.p16, utl.my12]}>
            <Text style={[utl.textDark, utl.fontInter, utl.textBase]}>
              Clue:
            </Text>
            <Text style={[utl.textDark, utl.fontJostMedium, utl.textLg]}>
              {clue}
            </Text>
          </View>

          {!isPenalized && (
            <PrimaryButton
              style={[utl.mb16]}
              title="Call for Vote"
              onPress={handleCallVote}
            />
          )}

          {isAdmin && (
            <PrimaryButton
              title="Continue"
              icon={<Ionicons name="arrow-forward" size={20} color="#333" />}
              onPress={handleContinue}
            />
          )}
        </>
      )}
    </ScrollView>
  );
}
