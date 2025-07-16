import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '../../src/api/api';
import { utl } from '../../styles/utl';
import PrimaryButton from '../../components/PrimaryButtons';


export default function QuestionScreen() {
  const router = useRouter();
 const { gameId, playerId, round } = useLocalSearchParams();
console.log('QuestionScreen loaded with gameId:', gameId, 'playerId:', playerId, 'round:', round);

if (!playerId) {
  return (
    <View style={[utl.flex1, utl.bgDark, utl.px24, utl.py64, utl.itemsCenter, utl.justifyCenter]}>
      <Text style={[utl.textError, utl.textBase, utl.fontInter]}>
        Error: No player ID provided.
      </Text>
    </View>
  );
}



  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (!gameId) return;

    const fetchQuestions = async () => {
      try {
        const response = await api.get(`/questions/game/${gameId}?round=${round}`);
        console.log('✅ Fetched questions:', response.data);
        setQuestions(response.data);
      } catch (error) {
        console.error('❌ Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [gameId]);

  if (!questions.length) {
    return (
      <View style={[utl.flex1, utl.bgDark, utl.px24, utl.py64, utl.itemsCenter, utl.justifyCenter]}>
        <Text style={[utl.textLight, utl.textBase, utl.fontInter]}>
          No questions found for this game.
        </Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

 const handleNext = async () => {
  if (!answer.trim()) return;

  try {
    console.log('Posting answer:', {
      game_id: gameId,
      player_id: playerId,
      question: currentQuestion.question,
      answer: answer.trim(),
    });

   await api.post('/answers', {
  game_id: gameId,
  player_id: playerId,
  question: currentQuestion.question,
  answer: answer.trim(),
  round_number: round,
});

    console.log('✅ Answer submitted to server');

    setAnswer('');

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log('✅ All answers submitted. Navigating to NarrativeScreen.');
      router.push(`/game/NarrativeScreen?gameId=${gameId}&playerId=${playerId}&round=${round}`);


    }
  } catch (error) {
    console.error('❌ Error submitting answer:', error);
  }
};




  return (
    <ScrollView contentContainerStyle={[utl.flex1, utl.bgDark, utl.px24, utl.py64]}>
      <Text style={[utl.textGold, utl.textCenter, utl.text2xl, utl.fontJostBold]}>
  🌀 Round {round} - Question {currentQuestionIndex + 1} of {questions.length}
</Text>


      <View style={[utl.mb16]}>
        <Text style={[utl.textLight, utl.textBase, utl.fontInter, utl.mb12]}>
          {currentQuestion.question}
        </Text>

        <TextInput
          value={answer}
          onChangeText={setAnswer}
          placeholder="Type your answer..."
          placeholderTextColor="#888"
          style={[
            utl.bgSurface,
            utl.textDark,
            utl.p12,
            utl.roundedLg,
            utl.border1,
            utl.fontInter,
            utl.mb16
          ]}
        />

        <PrimaryButton title="Next" onPress={handleNext} />
      </View>
    </ScrollView>
  );
}
