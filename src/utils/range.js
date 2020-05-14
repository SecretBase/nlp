export const rollDice = () => Math.floor(Math.random() * (6 - 1)) + 1;

export const getRandom = (digit) => {
  return parseInt(Array.from({ length: digit }, () => rollDice()).join(""), 10);
};
