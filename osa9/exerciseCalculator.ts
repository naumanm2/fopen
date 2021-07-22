interface ExerciseData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const exerciseCalculator = (
  data: Array<number>,
  target: number
): ExerciseData => {
  if (data.length < 1) throw new Error("not enough data");
  const targetHours: number = 20;
  const periodLength: number = data.length;
  const trainingDays: number = data.filter((x) => x > 0).length;
  const sum: number = data.reduce((a, b) => a + b, 0);
  const average: number = sum / periodLength;
  const percentage: number = sum / targetHours > 100 ? 100 : sum / targetHours;
  const rating: number = Math.floor(percentage * 3);

  const ratingDescription = (): string => {
    switch (rating) {
      case 1:
        return "worst case scenario";
      case 2:
        return "not too bad but could b better";
      case 3:
        return "good job";
      default:
        return "incorrect values";
    }
  };

  const result: ExerciseData = {
    periodLength,
    trainingDays,
    success: target < rating,
    rating,
    ratingDescription: ratingDescription(),
    target,
    average,
  };
  return result;
};

let target: number = 0;
let data: Array<number> = [];
for (var i = 2; i < process.argv.length; i++) {
  if (isNaN(Number(process.argv[i]))) throw new Error("incorrect values");
  if (i == 2) {
    target = Number(process.argv[i]);
  } else {
    data = data.concat(Number(process.argv[i]));
  }
}
console.log(exerciseCalculator(data, target));
