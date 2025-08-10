// QuestionScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, BackHandler } from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import api from '../../src/api/api';
import { utl } from '../../styles/utl';
import PrimaryButton from '../../components/PrimaryButtons';
import { QuestionRenderer } from '../../components/Questions/QuestionRenderer';
import GoToLobbyButton from '../../components/GoToLobbyButton';

export default function QuestionScreen() {
  const router = useRouter();
  const { gameId: g, playerId: p, round: r } = useLocalSearchParams();

const gameId = Array.isArray(g) ? g[0] : g || '';
const playerId = Array.isArray(p) ? p[0] : p || '';
const round = parseInt(Array.isArray(r) ? r[0] : r || '1', 10);


  

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        router.replace(`/game/LobbyScreen?gameId=${gameId}&playerId=${playerId}`);
        return true;
      };
      const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => sub.remove();
    }, [gameId, playerId])
  );

  useEffect(() => {
    if (!gameId || !playerId || !round) return;

   const fetchQuestions = async () => {
  try {
    const res = await api.get(`/questions/game/${gameId}/player/${playerId}?round=${round}`);
    setQuestions(res.data || []);
  } catch (err) {
    console.error('❌ Failed to fetch questions:', err);
  } finally {
    setLoading(false);
  }
};

fetchQuestions();
}, [gameId, playerId, round]);

  if (loading) {
    return (
      <View style={[utl.flex1, utl.bgDark, utl.itemsCenter, utl.justifyCenter]}>
        <Text style={[utl.textLight, utl.fontInter]}>Loading your question...</Text>
      </View>
    );
  }

  if (!questions.length) {
    return (
      <View style={[utl.flex1, utl.bgDark, utl.itemsCenter, utl.justifyCenter]}>
        <Text style={[utl.textError, utl.fontInter]}>
          No questions available. Please wait or contact the host.
        </Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = async () => {
  if (!currentAnswer) return;

  try {
    await api.post(`/answers/${gameId}/${playerId}/${round}`, {
      question: currentQuestion.question,
      answer: currentAnswer,
      type: currentQuestion.type || 'text',
      selected_option: currentAnswer,
    });

    setCurrentAnswer(null);

    const isLastQuestion = currentQuestionIndex + 1 >= questions.length;

    if (isLastQuestion) {
      // ✅ All questions answered — go to loading screen
      router.replace(`/game/LoadingNarrativeScreen?gameId=${gameId}&playerId=${playerId}&round=${round}`);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  } catch (err) {
    console.error('❌ Failed to submit answer:', err);
  }
};


  return (
    <ScrollView contentContainerStyle={[utl.flex1, utl.bgDark, utl.px24, utl.py64]}>
      <Text style={[utl.textGold, utl.textCenter, utl.text2xl, utl.fontJostBold]}>
        🌀 Round {round} - Question {currentQuestionIndex + 1} of {questions.length}
      </Text>

      {currentQuestion.clue && (
        <Text style={[utl.textLight, utl.textCenter, utl.mt16, utl.mb16]}>
          🕵️ Secret Clue: <Text style={[utl.textGold]}>{currentQuestion.clue}</Text>
        </Text>
      )}

      <View style={[utl.mt24]}>
        <QuestionRenderer
          question={currentQuestion}
          onAnswer={setCurrentAnswer}
          answer={currentAnswer}
        />
      </View>

      <PrimaryButton
        title={currentQuestionIndex + 1 < questions.length ? 'Next' : 'Finish'}
        onPress={handleNext}
        disabled={!currentAnswer}
      />
      <GoToLobbyButton gameId={gameId} playerId={playerId} />

    </ScrollView>
  );
}
