import { IQuizResults, TQuestion } from "@/types";

export const calculateQuizResults = (
  answers: number[],
  questions: TQuestion[],
): IQuizResults => {
  let totalScore = 0;
  let totalCorrect = 0;

  const detailedAnswers = questions.map((question, index) => {
    const selectedOption = question.options[answers[index]];
    const isCorrect = selectedOption?.is_correct ?? false;

    if (isCorrect) {
      totalCorrect++;
      totalScore += question.points;
    }

    return {
      question_id: question.id,
      selected_option_id: selectedOption?.id ?? "",
      is_correct: isCorrect,
      points_earned: isCorrect ? question.points : 0,
    };
  });

  return {
    totalScore,
    totalCorrect,
    detailedAnswers,
  };
};

export const calculateLevel = (totalPoints: number): string => {
  if (totalPoints >= 2000) return "Garuda";
  if (totalPoints >= 1000) return "Utama";
  if (totalPoints >= 500) return "Madya";
  return "Cikal";
};

export const levelMapping = {
  Cikal: 0,
  Madya: 500,
  Utama: 1000,
  Garuda: 2000,
};
