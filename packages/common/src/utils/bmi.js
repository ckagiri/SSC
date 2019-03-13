export const bmiLevels = [
  {
    bmi: 27,
    level: 'error',
  },
  {
    bmi: 25,
    level: 'extreme',
  },
  {
    bmi: 23,
    level: 'high',
  },
  {
    bmi: 21,
    level: 'medium',
  },
  {
    bmi: 18.5,
    level: 'normal',
  },
  {
    bmi: 0,
    level: 'low',
  },
];

export const bmiToKg = (height, bmi) =>
  height > 100 && height < 200 ? Math.round((height * height * bmi) / 10000) : null;

export const bmi = (height, weight) =>
  height > 100 && height < 200 && weight > 30 && weight < 300
    ? Math.round((weight * 100000) / height / height) / 10
    : null;

export const getBmiLevel = index => bmiLevels.find(level => index >= level.bmi);

export const toLose = (height, weight) =>
  weight - bmiToKg(height, 23) >= 1
    ? `${weight - bmiToKg(height, 23)} -  ${weight - bmiToKg(height, 21)}`
    : weight - bmiToKg(height, 22) >= 1
    ? `${weight - bmiToKg(height, 21)} -  ${weight - bmiToKg(height, 20)}`
    : weight - bmiToKg(height, 20) >= 1
    ? `${weight - bmiToKg(height, 20)}`
    : null;
