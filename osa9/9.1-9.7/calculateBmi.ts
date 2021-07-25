export const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / height / height) * 10000;
  switch (true) {
    case bmi < 18:
      return "underweight";
    case bmi < 21:
      return "healthy weight";
    case bmi < 25:
      return "normal weight";
    case bmi > 25:
      return "overweight";
    default:
      return "incorrect values";
  }
};
const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

console.log(calculateBmi(height, weight));
