export var bmiLevels = [{
  bmi: 27,
  level: 'error'
}, {
  bmi: 25,
  level: 'extreme'
}, {
  bmi: 23,
  level: 'high'
}, {
  bmi: 21,
  level: 'medium'
}, {
  bmi: 18.5,
  level: 'normal'
}, {
  bmi: 0,
  level: 'low'
}];
export var bmiToKg = function bmiToKg(height, bmi) {
  return height > 100 && height < 200 ? Math.round(height * height * bmi / 10000) : null;
};
export var bmi = function bmi(height, weight) {
  return height > 100 && height < 200 && weight > 30 && weight < 300 ? Math.round(weight * 100000 / height / height) / 10 : null;
};
export var getBmiLevel = function getBmiLevel(index) {
  return bmiLevels.find(function (level) {
    return index >= level.bmi;
  });
};
export var toLose = function toLose(height, weight) {
  return weight - bmiToKg(height, 23) >= 1 ? "".concat(weight - bmiToKg(height, 23), " -  ").concat(weight - bmiToKg(height, 21)) : weight - bmiToKg(height, 22) >= 1 ? "".concat(weight - bmiToKg(height, 21), " -  ").concat(weight - bmiToKg(height, 20)) : weight - bmiToKg(height, 20) >= 1 ? "".concat(weight - bmiToKg(height, 20)) : null;
};