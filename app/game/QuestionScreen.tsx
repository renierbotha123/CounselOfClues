import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, BackHandler } from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import api from '../../src/api/api';
import { utl } from '../../styles/utl';
import PrimaryButton from '../../components/PrimaryButtons';
import { QuestionRenderer } from '../../components/Questions/QuestionRenderer';

export default function QuestionScreen() {
  const router = useRouter();
  const { gameId, playerId, round } = useLocalSearchParams();

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🔙 Override Android back button to return to Lobby
  useFocusEffect(
  React.useCallback(() => {
    const onBackPress = () => {
      router.replace(`/game/LobbyScreen?gameId=${gameId}&playerId=${playerId}`);
      return true;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, [gameId, playerId])
);


  // ⏳ Wait for questions to be ready (polling)
  useEffect(() => {
    if (!gameId || !playerId || !round) return;

    let tries = 0;
    const maxTries = 30;

    const pollForQuestions = async () => {
      try {
        const res = await api.get(`/questions/game/${gameId}/player/${playerId}?round=${round}`);
        if (res.data && res.data.length > 0) {
          setQuestions(res.data);
          setLoading(false);
        } else if (tries < maxTries) {
          tries++;
          setTimeout(pollForQuestions, 1000); // try again in 1s
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error('❌ Failed to fetch questions:', err);
        setLoading(false);
      }
    };

    pollForQuestions();
  }, [gameId, playerId, round]);

  if (loading) {
    return (
      <View style={[utl.flex1, utl.bgDark, utl.itemsCenter, utl.justifyCenter]}>
        <Text style={[utl.textLight, utl.fontInter]}>
          Loading your question...
        </Text>
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
    try {
  await api.post(`/answers/${gameId}/${playerId}/${round}`, {
    question: currentQuestion.question, // ✅ Required by DB
    answer: currentAnswer,
    type: currentQuestion.type || 'text',
    selected_option: currentAnswer, // optional — only used for multiple choice
  });


      setCurrentAnswer(null);

      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
       router.replace(`/game/LoadingNarrativeScreen?gameId=${gameId}&playerId=${playerId}&round=${round}`);
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
    </ScrollView>
  );
}
